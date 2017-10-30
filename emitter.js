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
            if (!this.handlers.hasOwnProperty(event)) {
                this.handlers[event] = [];
            }
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
            for (let handler in this.handlers) {
                if (this.handlers.hasOwnProperty(handler) &&
                    handler.indexOf(event + '.') !== -1) {
                    unsubscribe(this.handlers, event, context);
                    break;
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
                if (!this.handlers.hasOwnProperty(event)) {
                    this.handlers[event] = [];
                }
                if (this.handlers.hasOwnProperty(event)) {
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
    let index = handlers[event].findIndex(function (handler) {
        return handler.student === context;
    });
    if (index !== -1) {
        handlers[event].splice(index, 1);
    }
}
