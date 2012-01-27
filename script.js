/*!
 * Copyright (c) 2012 Marten Schilstra. All rights reserved.
 * Written by Marten Schilstra <info@martndemus.nl>
 *
 * MIT license, see the file /LICENSE for more details.
 */

(function (window, undefined) {
    'use strict';

    // groups: Initialize the empty namespace object callbacks, where all callback
    // functions should get attached to.
    window.callbacks = {};

    /**
     *  Array with objects containing data about a class of students.
     *  Each object represents one class of students.
     *
     *  @example:
     *  {
     *      'id':         '#SPLUSAE22C3',    // ID string of the class of students
     *      'department': 'Engineering'      // The department the class belongs to
     *      'study':      'Informatica',     // Nice human readable name of the study
     *      'class':      'I1A'              // Specific class' label
     *  }
     */
    var groups = [
        {
            'id':         '#SPLUSAE22C3',
            'department': 'Engineering',
            'study':      'Informatica',
            'class':      'I1A'
        },
        {
            'id':         '#SPLUSA49837',
            'department': 'Engineering',
            'study':      'Informatica',
            'class':      'I1B'
        }
    ];

    // Put all constant values in their own namespace object
    var constants = {

        // Unix timestamp of the start of the current schoolyear
        'yearstart': 1314576000000,

        // Length of a single week in ms
        'weeklength': 604800000,

        // Array of chars in range a-z
        'chars': 'abcdefghijklmnopqrstuvwxyz'.split('')
    }

    // Put all generic helper functions into it's own namespace object
    var helpers = {
        /**
         *  dateToWeekNumber: Converts a Date object to a nth weeknumber according to the schoolyear.
         *
         *  @param {Date} date --- A Date object that needs to be converted to a weeknumber.
         *  @return {int} --- The nth weeknumber from the start of the schoolyear.
         */
        'dateToWeekNumber': function(date) {
            return Math.ceil((date.getTime() - constants.yearstart + 1) / constants.weeklength);
        },

        /**
         *  gen8CharStr: Creates a string of 8 randomly selected characters from the alphabet.
         *
         *  @return {string} --- A string of 8 random selected characters from range a-z.
         */
        'gen8CharStr': function() {
            var i,
                ret = '';

            for (i = 0; i < 8; i++) {
                ret += constants.chars[Math.floor(Math.random() * 26)];
            }

            return ret;
        },


        /**
         *  Returns an url encoded string with a YQL query url to the NHL rooster db.
         *
         *  @param {string} id --- Id of the callback function
         *  @param {string} group --- Object with data about the group the roster is queried for.
         *  @param {int} week --- Weeknumber for the roster to get.
         *  @return {string} --- Url encoded string with YQL query url.
         */
         'buildYQLstring': function(id, group, week) {
            return 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20' +
                   "url%3D'http%3A%2F%2Fwebrooster.nhl.nl%2F" + 'Reporting%2FTextspreadsheet%3B' +
                   'Student%2Bset%2Bgroups%3Bid%3B' + group.id.replace('#', '%2523') +
                   '%3Ftemplate%3Dtabelrooster%2Bstudentensetgroepen%26weeks%3D' + week +
                   "'&format=json&callback=callbacks." + id;
         }
    }

    /**
     *  JSONPcall: Makes an JSONP request and returns a callback function that should get called by
     *  the callback of the JSONP request, when that function gets called, it in turn calls another
     *  callback and supplies the data to it.
     *
     *  @param {string} request --- the url of the JSONP request.
     *  @param {function} callback --- A function that processes the data from the JSONP request
     *  @return {function} --- The function that gets called when the JSONP request if fullfilled
     */
    var JSONPGetRoster = function(group, week, callback) {
        var id, script;

        id = helpers.gen8CharStr();

        script = document.createElement('script');
        script.id = id;
        script.type = 'text/javascript';
        script.src = helpers.buildYQLstring(id, group, week);

        document.body.appendChild(script);

        window.callbacks[id] = function(data) {
            if (data) {
                callback(data);
            }

            document.body.removeChild(script);
        };
    };

    /**
     *  Lesson: Creates an lesson object, which contains data about a lesson.
     *
     *  @param {object} lesson --- A raw yql part with data about a single lesson.
     *  @method {string} name   --- Returns the name of the lesson.
     *  @method {string} start  --- Returns starting time of the lesson.
     *  @method {string} duration --- Returns the length in time of the lesson.
     *  @method {string} teacher --- Returns the teacher of that lesson.
     *  @method {string} classroom --- Returns the classroom id of the lesson.
     *  @method {string} note --- Returns the optional note of the lesson.
     */

    var Lesson = function (lesson) {
        if (!lesson) {
            return false;
        }

        this.name = function() {
            return lesson.td[0].p;
        };

        this.start = function() {
            return lesson.td[1].p;
        };

        this.duration = function() {
            return lesson.td[2].p;
        };

        this.teacher = function() {
            return lesson.td[3].p;
        };

        this.classroom = function() {
            return lesson.td[4].p;
        };

        this.note = function() {
            return lesson.td[6].p;
        };
    };

    /**
     *  WeekDay: Curries out a function with a set name of the day.
     *
     *  @param {string} dayName --- name of the function that the function will use.
     *  @return {function} --- this function initializes a day object with a preset day name.
     */
    var WeekDay = function (dayName) {
        /**
         *  Initializes a day object that holds information about the schedule of a day
         *
         *  @param {object} dayObj --- A raw yql object that contains information about the schedule
         *      of a single day.
         *  @method {string} name --- Returns the name of the day this object belongs to.
         *  @property {Lesson} 0.. --- Each numbered property references a Lesson object.
         *  @property {int} length --- The amount of Lesson objects this references to.
         */
       return function(dayObj) {
            var i;

            this.name = function() {
                return dayName;
            };

            if (!dayObj.tr) {
                this.length = 0;
                return;
            }

            for (i = 1; i < dayObj.tr.length; i++) {
                this[i-1] = new Lesson(dayObj.tr[i]);
            }

            this.length = --i;
        };
    };

    // Create a WeekDay for each day of the week.
    var Monday = WeekDay('Maandag'),
        Tuesday = WeekDay('Dinsdag'),
        Wednesday = WeekDay('Woensdag'),
        Thursday = WeekDay('Donderdag'),
        Friday = WeekDay('Vrijdag');

    /**
     *  Initializes a WeekRoster object that information about a roster for a specific week for a
     *  specific group/study.
     *
     *  @param {object} data --- Raw yql data object that contains information about the weekroster.
     *  @property {weekDay} monday .. friday -- References to a WeekDay object that contains
     *      roster information about that day of the week.
     */
    var WeekRoster = function(data) {
        var days;

        if (!data) {
            return false;
        }

        days = data.query.results.body.table.splice(1,5);

        this.monday = new Monday(days[0]);
        this.tuesday = new Tuesday(days[1]);
        this.wednesday = new Wednesday(days[2]);
        this.thursday = new Thursday(days[3]);
        this.friday = new Friday(days[4]);
    };

    WeekRoster.prototype.buildSequentialHTML = function () {
        var html;

        var buildLesson = function(lesson) {
            var html;

            html = '<p>' + lesson.start() + ' ' + lesson.name() + ' ' + lesson.classroom() + '</p>';

            return html;

        };

        var buildDay = function(day) {
            var i, html;

            html = '<div class=day><h4>' + day.name() + '</h4>';

            if (day.length > 0) {
                for (i = 0; i < day.length; i++) {
                    html += buildLesson(day[i]);
                }
            }
            else {
                html += '<p>Geen lessen</p>'
            }

            return html + '</div>';
        };

        html = buildDay(this.monday) +
               buildDay(this.tuesday) +
               buildDay(this.wednesday) +
               buildDay(this.thursday) +
               buildDay(this.friday);

       return html;
    };

    JSONPGetRoster(groups[1], 24, function (data) {
        var roster = new WeekRoster(data);
        document.getElementById('rooster').innerHTML = roster.buildSequentialHTML();
    })


}(window));



//    var getRoster = function(group, week) {
//        var yql, request;

//        yql = "select%20*%20from%20html%20where%20url%3D'" + encodeURIComponent('http://webrooster.nhl.nl/Reporting/Textspreadsheet;Student+set+groups;id;' +    encodeURIComponent(group.id) + '?template=tabelrooster+studentensetgroepen&weeks=' + week) + "'&format=json&callback=loggit";

//        request = document.createElement('script');
//        request.src = 'http://query.yahooapis.com/v1/public/yql?q=' + yql;
//    };
