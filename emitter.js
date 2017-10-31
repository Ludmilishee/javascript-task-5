'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
getEmitter.isStar = false;
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
            this.handlers[event].push(
                {
                    student: context,
                    func: handler.bind(context)
                });

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            let unsubscribedEvents = [];
            if (!this.handlers.hasOwnProperty(event) &&
                !Object.keys(this.handlers).every(handler => handler.startsWith(event + '.'))) {
                return this;
            }
            for (let handler in this.handlers) {
                if (handler.indexOf(event + '.') === -1) {
                    continue;
                }
                let isAlreadyUnsub = unsubscribedEvents.some(function (item) {
                    return item === handler;
                });
                if (!isAlreadyUnsub) {
                    unsubscribedEvents.push(unsubscribe(this.handlers, handler, context));
                }
            }
            unsubscribe(this.handlers, event, context);

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
                if (this.handlers.hasOwnProperty(event) &&
                this.handlers[event].length !== 0) {
                    this.handlers[event].forEach(function (handler) {
                        handler.func();
                    });
                }
                event = event.slice(0, event.lastIndexOf('.'));
                counter--;
            }

            return this;
        }

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         * @returns {Object}
         */
        /*      several: function (event, context, handler) {

            return this;
        }, */

    /**
     * Подписаться на событие с ограничением по частоте получения уведомлений
     * @star
     * @param {String} event
     * @param {Object} context
     * @param {Function} handler
     * @param {Number} frequency – как часто уведомлять
     * @returns {Object}
     */
        /*     through: function (event, context, handler, frequency) {
            return this;
        } */
    };
}

function unsubscribe(handlers, event, context) {
    if (handlers.hasOwnProperty(event)) {
        let index = handlers[event].findIndex(function (handler) {
            return handler.student === context;
        });
        if (index !== -1) {
            handlers[event].splice(index, 1);
        }
    }
}
