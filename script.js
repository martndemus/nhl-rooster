/*!
 * Copyright (c) 2012 Marten Schilstra. All rights reserved.
 * Written by Marten Schilstra <info@martndemus.nl>
 *
 * MIT license, see the file /LICENSE for more details.
 */

(function (window, undefined) {
    'use strict';

    /**
     *  Adds eventlisteners to the DCL and onLoad event, calls the callback when one of them happens
     *
     *  @param {function} callback --- Function that needs to be called on the DCL event.
     */
    var onDocReady = function (callback) {
        var loaded, ready, DOMContentLoaded;

        // If loading is already done
        if (document.readyState === 'complete') {
            callback();
            return;
        }

        // Before loaded, remove the domcontentloaded eventlistener
        DOMContentLoaded = function () {
            document.removeEventListener( 'DOMContentLoaded',DOMContentLoaded , false );
            loaded();
        };

        // On loaded do callback.
        loaded = function () {
            if (!ready) {
                callback();
                ready = true;
            }
        };

        // If DOMContentLoaded event is available
        document.addEventListener( 'DOMContentLoaded', DOMContentLoaded , false );

        // Else fall back on load event
        window.addEventListener('load', loaded, false);
    };

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
            'id':         '#SPLUS630532',
            'department': 'Economie & Management',
            'study':      'Bedrijfseconomie',
            'class':      'BE1A'
        },
        {
            'id':         '#SPLUS630533',
            'department': 'Economie & Management',
            'study':      'Bedrijfseconomie',
            'class':      'BE1B'
        },
        {
            'id':         '#SPLUS811D13',
            'department': 'Economie & Management',
            'study':      'Bedrijfseconomie',
            'class':      'BE1C'
        },
        {
            'id':         '#SPLUS8182BA',
            'department': 'Economie & Management',
            'study':      'Bedrijfseconomie',
            'class':      'BE1D'
        },
        {
            'id':         '#SPLUSDDDCD9',
            'department': 'Economie & Management',
            'study':      'Bedrijfseconomie',
            'class':      'BE2A'
        },
        {
            'id':         '#SPLUSDDDCD8',
            'department': 'Economie & Management',
            'study':      'Bedrijfseconomie',
            'class':      'BE2B'
        },
        {
            'id':         '#SPLUS9521DE',
            'department': 'Economie & Management',
            'study':      'Bedrijfseconomie',
            'class':      'BE3A'
        },
        {
            'id':         '#SPLUS02D2BA',
            'department': 'Economie & Management',
            'study':      'Bedrijfseconomie',
            'class':      'BE3B'
        },
        {
            'id':         '#SPLUS5AEF90',
            'department': 'Economie & Management',
            'study':      'Bedrijfseconomie',
            'class':      'BE3C'
        },
        {
            'id':         '#SPLUS90442F',
            'department': 'Economie & Management',
            'study':      'Bedrijfseconomie',
            'class':      'BE4'
        },
        {
            'id':         '#SPLUSA4982C',
            'department': 'Engineering',
            'study':      'Electrotechniek',
            'class':      'E1A'
        },
        {
            'id':         '#SPLUSA4982F',
            'department': 'Engineering',
            'study':      'Electrotechniek',
            'class':      'E1B'
        },
        {
            'id':         '#SPLUSA49830',
            'department': 'Engineering',
            'study':      'Electrotechniek',
            'class':      'E2A'
        },
        {
            'id':         '#SPLUSF358F3',
            'department': 'Engineering',
            'study':      'Electrotechniek',
            'class':      'E2B'
        },
        {
            'id':         '#SPLUSA49831',
            'department': 'Engineering',
            'study':      'Electrotechniek',
            'class':      'E4A'
        },
        {
            'id':         '#SPLUSA49835',
            'department': 'Engineering',
            'study':      'Electrotechniek',
            'class':      'E4I'
        },
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
        },
        {
            'id':         '#SPLUSA49838',
            'department': 'Engineering',
            'study':      'Informatica',
            'class':      'I2A'
        },
        {
            'id':         '#SPLUSDD7557',
            'department': 'Engineering',
            'study':      'Informatica',
            'class':      'I2B'
        },
        {
            'id':         '#SPLUSA49839',
            'department': 'Engineering',
            'study':      'Informatica',
            'class':      'I3'
        },
        {
            'id':         '#SPLUSA4983A',
            'department': 'Engineering',
            'study':      'Informatica',
            'class':      'I4A'
        },
        {
            'id':         '#SPLUSF358F4',
            'department': 'Engineering',
            'study':      'Informatica',
            'class':      'I4B'
        }
    ];

    /*
     *  Constant variable namespace
     *
     *  @namespace Holds all constant values
     */
    var Constants = {};

    // Unix timestamp of the start of the current schoolyear
    Constants.yearstart = 1314576000000;

    // Length of a single week in ms
    Constants.weeklength = 604800000;

    // MS between Monday 00:00 am, Friday 00:00 am
    Constants.dayLength = 86400000;

    // Array of chars in range a-z
    Constants.chars = 'abcdefghijklmnopqrstuvwxyz'.split('');

    // Days of the week in an array
    Constants.days = 'Zondag;Maandag;Dinsdag;Woensdag;Donderdag;Vrijdag;Zaterdag'.split(';');

    // Months of the year in an array
    Constants.months = 'Januari;Februari;Maart;April;Mei;Juni;Juli;Augustus;September;Oktober;November;December'.split(';');

    /*
     *  Utility function namespace
     *
     *  @namespace Holds all utility functions in a single namespace
     */
    var Utils = {};

    /**
     *  dateToWeekNumber: Converts a Date object to a nth weeknumber according to the schoolyear.
     *
     *  @param {Date} date --- A Date object that needs to be converted to a weeknumber.
     *  @return {int} --- The nth weeknumber from the start of the schoolyear.
     */
    Utils.dateToWeekNumber = function(date) {
        return Math.ceil((date.getTime() - Constants.yearstart + 1) / Constants.weeklength);
    };

    /*
     * Function that takes a Date object and formats that into a string with the given format.
     *
     * @param {Date} date --- A date object that needs formatting
     * @param {string} format --- A string with information about how the date should be formatted
     * @returns {string} --- A string with a formatted date.
     *
     * @example: These are the symbols available for formatting:
     *     %a: The abbreviated weekday name.
     *     %A: The  full  weekday  name.
     *     %b: The abbreviated month name.
     *     %B: The  full  month  name.
     *     %d: Day of the month.
     *     %y: Year without a century.
     *     %Y: Year with century.
     *
     *     Example: '%a %d %B, %Y' woudl turn into 'Mon 05 January, 2012'
     */
    Utils.formatDate = function(date, format) {

        // Return empty string when no date is given.
        if (!date) {
            return '';
        }

        // Set default for format, if format is not set.
        format = format || '%a %d %B, %Y';

        return format.replace(/%[a-z]/ig, function(str) {
            switch (str) {
                case '%a':
                    return Constants.days[date.getDay()].substring(0,2);
                case '%A':
                    return Constants.days[date.getDay()];
                case '%b':
                    return Constants.months[date.getMonth()].substring(0,3);
                case '%B':
                    return Constants.months[date.getMonth()];
                case '%d':
                    return date.getDate().toString().replace(/^[\d]$/, '0$&');
                case '%y':
                    return date.getFullYear().toString().substr(-2);
                case '%Y':
                    return date.getFullYear();
                default:
                    return '';
            }
        });
    };

    /*
     * Adds up n amount of days to the given Date object
     *
     * @param {Date} date --- A date object.
     * @param {number} n --- The amount of days to add, can be negative.
     * @returns {Date} --- A date object with n days added.
     */
    Utils.addDays = function(date, n) {
        return new Date(date.getTime() + (Constants.dayLength * n));
    };

    /*
     *
     */
    Utils.parseTime = function(timestring) {
        var time;

        // Split the timestring into an array
        timestring = timestring.split(':');

        // Progressively add the hours, minutes, etc if they exist and are parseable.
        if (timestring[0] && typeof(parseInt(timestring[0])) === 'number' ) {
            time = parseInt(timestring[0]) * 60 * 60 * 1000;

            if (timestring[1] && typeof(parseInt(timestring[1])) === 'number' ) {
                time += parseInt(timestring[1]) * 60 * 1000;

                if (timestring[2] && typeof(parseInt(timestring[2])) === 'number') {
                    time += parseInt(timestring[2]) * 1000;
                }
            }
        }

        return time;
    };

    /*
     *  Prepends a zero if a single digit number is given.
     *
     *  @param {string|number} time -- A number represented as string or number.
     *  @returns {string} --- The given time padded with a zero if needed.
     */
    Utils.padZero = function(time) {
        // Just concat a 0 before the given time if it a string with length 1.
        if (typeof(time) === 'string' && time.length === 1) {
           return '0' + time;
        }

        // If its a time and < 10 then pad a concat a zero befor it.
        if (typeof(time) === 'number' && time < 10) {
            return '0' + time;
        }

        // Return unchanged int if none of the above applies.
        return time;
    };

    /*
     *  Formats given date object into a ISO8601 formatted string.
     *
     *  @param {Date} date --- A Date object.
     *  @returns {string} --- The given date as a ISO8601 formatted string.
     *  @see https://en.wikipedia.org/wiki/Iso8601
     */
    Utils.formatISO8601 = function(date) {
        return date.getFullYear() + '-' +
            Utils.padZero(date.getMonth() + 1) + '-' +
            Utils.padZero(date.getDate()) + 'T' +
            Utils.padZero(date.getHours()) + ':' +
            Utils.padZero(date.getMinutes()) + ':' +
            Utils.padZero(date.getSeconds()) + '+' +
            Utils.padZero(date.getTimezoneOffset() / 60 * -1) + ':00';
    };

    /**
     *  YQL namespace for creating YQL query strings
     *
     *  All function returns an url encoded string with a YQL query url to a part the NHL rooster db.
     *  @namespace Holds all the YQL query string create functions.
     */
    var YQL = {};

    /**
     *  Creates YQL query string for student rosters.
     *
     *  @param {string} group --- Object with data about the group the roster is queried for.
     *  @param {int} week --- Weeknumber for the roster to get.
     *  @return {string} --- Url encoded string with YQL query url.
     */
    YQL.studentString = function(group, week) {
        return 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20' +
               "url%3D'http%3A%2F%2Fwebrooster.nhl.nl%2F" + 'Reporting%2FTextspreadsheet%3B' +
               'Student%2Bset%2Bgroups%3Bid%3B' + group.id.replace('#', '%2523') +
               '%3Ftemplate%3Dtabelrooster%2Bstudentensetgroepen%26weeks%3D' + week +
               "%26days%3D1%3B2%3B3%3B4%3B5'&format=json&callback=";
    };

    /**
     *  XHR object, the base function does not do anything on it's own, it only initilizes a few common things
     */
    var XHR = function() {
        // Create a new XHR.
        var xhr = new XMLHttpRequest();

        /**
         *  Sets a callback on the readystate = 4 event. Passes the responseText
         *  to the callback function. If the responseText is JSON, it get's parsed.
         *
         *  @param {function} callback --- The callback to call.
         */
        var setCallback = function(callback) {
            xhr.addEventListener('readystatechange', function() {
                if (xhr.readyState === 4 && callback) {
                    var response;

                    // Try to convert the responseText from JSON to an Object.
                    try {
                        response = JSON.parse(xhr.responseText);
                    }
                    catch (e) {
                        response = xhr.responseText;
                    }

                    callback(response);
                }
            });
        };

        // Empty constructor.
        var XHR = function() {};

        XHR.prototype.getStudentRoster = function(group, week, callback) {
            xhr.open('GET', YQL.studentString(group, week));
            setCallback(callback);
            xhr.send();
        };

        return new XHR();
    }

    /**
     *  The roster object,
     */
    var Roster = function (data, type) {
        // If data type === raw, preprocess the data.
        if (type === 'raw') {
            data = function(data) {
                // Check if data actually contains something usefull, else return false
                if (!(data && data.query && data.query.results !== null)) {
                    return false;
                }

                // Pick the raw day object out of the data as an array.
                var days = data.query.results.body.table.splice(1,5),

                // Parse the start and end date of the week out of the data.
                startEndDate = function(string) {
                    // Strip words we don't need & split into array.
                    string = string.replace(/(Periode\:|tot)/gi,'');
                    string = string.split('  ');
                    // Parse the strings into date objects.
                    string[0] = Date.parse(string[0]);
                    string[1] = Date.parse(string[1]);
                    string[0] = new Date(string[0]);
                    string[1] = new Date(string[1]);

                    return string;
                }(data.query.results.body.table[0].tr[1].td.table.tr.td[0].p);


                var transformLesson = function (rawLesson, date) {
                    var lesson;

                    // Return empty object if there is no data.
                    if (!(rawLesson && rawLesson.td)) {
                        return {};
                    }

                    lesson = {
                        'name':      rawLesson.td[0].p,
                        'start':     rawLesson.td[1].p,
                        'duration':  rawLesson.td[2].p,
                        'teacher':   rawLesson.td[3].p,
                        'classroom': rawLesson.td[4].p,
                        'note':      rawLesson.td[6].p
                    };

                    lesson.start = new Date(date.getTime() + Utils.parseTime(lesson.start));
                    lesson.duration = Utils.parseTime(lesson.duration);
                    lesson.end = new Date(lesson.start.getTime() + lesson.duration);

                    return lesson;
                };

                var transformDay = function (rawDay, date) {
                    var i, day;

                    // Init day as object
                    day = {
                        'date': date,
                        'dayNumber': date.getDay(),
                        'lessons': []
                    };

                    // Return empty array if there is no data.
                    if (!(rawDay && rawDay.tr)) {
                        return day;
                    }

                    // Pass lesson data to transformLesson, push returned object to day.
                    for (i = 1; i < rawDay.tr.length; i++) {
                        day.lessons.push(transformLesson(rawDay.tr[i], date));
                    }

                    return day;
                };

                // Transform all data in to a nice object.
                data = {
                    'created': new Date(data.query.created),
                    'weekStart': startEndDate[0],
                    'weekEnd': Utils.addDays(startEndDate[1], -2)
                };

                data.Monday = transformDay(days[0], data.weekStart);
                data.Tuesday = transformDay(days[1], Utils.addDays(data.weekStart, 1));
                data.Wednesday = transformDay(days[2], Utils.addDays(data.weekStart, 2));
                data.Thursday = transformDay(days[3], Utils.addDays(data.weekStart, 3));
                data.Friday = transformDay(days[4], Utils.addDays(data.weekStart, 4));

                return data;

            }(data);
        }

        var Roster = function () {};

        Roster.prototype.JSON = function () {
            return data;
        };

        Roster.prototype.stringify = function () {
            return JSON.stringify(data);
        };

        Roster.prototype.toHTML = function () {
            var html;

            var buildLessonHTML = function (lesson) {
                var html;

                html = '<article class="lesson"><div>';

                if (lesson.name) {
                    html += '<span>' + lesson.name + '</span>';

                    if (lesson.start && lesson.end) {
                        console.dir(lesson.start);
                        html += '<span class=time>';
                        html += '<time class="dtstart" datetime="' + Utils.formatISO8601(lesson.start) + '">';
                        html += lesson.start.getHours() + ':' + Utils.padZero(lesson.start.getMinutes());
                        html += '</time> - ';
                        html += '<time class="dtend" datetime="' + Utils.formatISO8601(lesson.end) + '">';
                        html += lesson.end.getHours() + ':' + Utils.padZero(lesson.end.getMinutes());
                        html += '</time></span>';
                    }

                    html += '</div><div>';

                    if (lesson.classroom) {
                        html += '<span class="classroom">' + lesson.classroom + '</span>';
                    }

                    if (lesson.start && lesson.end) {
                        html += '<span class=addcalender>+ Kalender<span>';
                    }
                }

                html += '</div></article>';

                return html;
            };

            var buildDayHTML = function (day) {
                var i, dayElement;

                dayElement = document.createElement('article');
                dayElement.className = 'day';
                dayElement.innerHTML = '<h3>' + Constants.days[day.dayNumber] + '</h3>';

                if (day.lessons && day.lessons.length > 0) {
                    for (i = 0; i < day.lessons.length; i++) {
                        dayElement.innerHTML += buildLessonHTML(day.lessons[i]);
                    }
                }
                else {
                    dayElement.innerHTML += buildLessonHTML({'name':'Geen lessen'});
                }



                return dayElement.outerHTML;
            };

            html  = buildDayHTML(data.Monday);
            html += buildDayHTML(data.Tuesday);
            html += buildDayHTML(data.Wednesday);
            html += buildDayHTML(data.Thursday);
            html += buildDayHTML(data.Friday);

            return html;
        };

        return new Roster();
    };

    /**
     *  Looks up all unique departments in groups and inserts them as options in the department selector
     */
    var insertDepartments = function () {
        var i, p, container, departments, option;

        // Create reference to department selector containter.
        container = document.getElementById('department');

        // Find all unique departments
        departments = [];

        for (i = 0, p = -1; i < groups.length; i++) {
            if (groups[i].department !== departments[p]) {
                departments[++p] = groups[i].department;
            }
        }

        // Sort the departments alphabetically
        departments.sort();

        // Insert the departments into the container
        for (i = 0; i <= p; i++) {
            option = document.createElement('option');
            option.innerHTML = departments[i];
            container.appendChild(option);
        }
    };

    var insertClasses = function (department) {
        var i, container, global, classes, option;

        // Create reference to class-name selector container
        container = document.getElementById('class-name');

        // If department is not set, set bool to insert all classes
        if (!department) {
            global = true;
        }

        classes = [];
        for (i = 0; i < groups.length; i++) {
            // Skip if group is not in department.
            if (global === undefined && groups[i].department !== department) {
                continue;
            }

            classes.push(groups[i]);
        }

        classes.sort(function(a,b) {
            return a.study - b.study;
        });

        for (i = 0; i < classes.length; i++) {
            option = document.createElement('option');
            option.value = classes[i].id;
            option.innerHTML = classes[i].study + ' - ' + classes[i]['class'];
            container.appendChild(option);
        }
    };

    var insertWeeks = function () {
        var i, container, option, thisWeek, weekStart, weekEnd, weekNumber;

        // Create reference to week selector container
        container = document.getElementById('week');

        thisWeek = Utils.dateToWeekNumber(new Date());

        for (i = -10; i <= 10; i++) {
            weekStart = Constants.yearstart + ((thisWeek + i - 1) * Constants.weeklength);
            weekNumber = Utils.dateToWeekNumber(new Date(weekStart));

            option = document.createElement('option');
            option.value = weekNumber;
            option.innerHTML = Utils.formatDate(new Date(weekStart), '%d %B, %Y');

            if (weekNumber === thisWeek) {
                option.selected = true;
            }

            container.appendChild(option);
        }
    };

    XHR().getStudentRoster(groups[17], 24, function (data) {
        var roster = Roster(data, 'raw');
        console.log(roster.stringify());
        document.getElementById('rooster').innerHTML = roster.toHTML();
    });

    onDocReady(function () {
        insertDepartments();
        insertClasses();
        insertWeeks();
    });

}(window));
