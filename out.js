System.register("index", ["./config", "./models"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var config_1, models_1, user, product;
    return {
        setters: [
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (models_1_1) {
                models_1 = models_1_1;
            }
        ],
        execute: function () {
            console.log(config_1.config.name);
            user = new models_1.User();
            product = new models_1.Product();
        }
    };
});
