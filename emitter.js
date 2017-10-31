'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
getEmitter.isStar = true;
module.exports = getEmitter;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    return {
        handlers: {},

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            this.handlers[event] = this.handlers[event] || [];
            this.handlers[event].push(createHandler(context, handler));

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {

            let unsubscribed = Object.keys(this.handlers).filter(handler =>
                (handler.startsWith(event + '.') || event === handler));
            unsubscribed.forEach(unsubEvent => {
                this.handlers[unsubEvent] = this.handlers[unsubEvent].filter(handler =>
                    handler.student !== context);
            });

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            let counter = event.split('.').length;
            while (counter > 0) {
                if (this.handlers.hasOwnProperty(event)) {
                    this.handlers[event].forEach(function (handler) {
                        if (!handler.hasOwnProperty('times') &&
                            !handler.hasOwnProperty('frequency') ||
                            handler.count % handler.frequency === 0 || handler.count === 0) {
                            handler.func();
                        }
                        if (handler.hasOwnProperty('times') && handler.times > 0) {
                            handler.func();
                            handler.times--;
                        } else if (handler.hasOwnProperty('count')) {
                            handler.count++;
                        }
                    });
                }
                event = event.slice(0, event.lastIndexOf('.'));
                counter--;
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         * @returns {Object}
         */
        several: function (event, context, handler, times) {
            this.handlers[event] = this.handlers[event] || [];
            let handlerObject = createHandler(context, handler);
            if (times > 0) {
                handlerObject.times = times;
            }
            this.handlers[event].push(handlerObject);

            return this;
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         * @returns {Object}
         */
        through: function (event, context, handler, frequency) {
            this.handlers[event] = this.handlers[event] || [];
            let handlerObject = createHandler(context, handler);
            if (frequency > 0) {
                handlerObject.frequency = frequency;
                handlerObject.count = 0;
            }
            this.handlers[event].push(handlerObject);

            return this;
        }
    };
}

function createHandler(context, handler) {
    return {
        student: context,
        func: handler.bind(context)
    };
}

