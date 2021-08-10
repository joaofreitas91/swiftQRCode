sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/odata/v2/ODataModel',
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/BusyIndicator',
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/ndc/BarcodeScanner"


], function (Controller, ODataModel, JSONModel, BusyIndicator, Filter, FilterOperator, MessageBox, BarcodeScanner) {
    'use strict';

    return Controller.extend("swiftQRCode.swift.controller.App", {
        onInit: function () {

        },

        onQrCode: function () {
            BarcodeScanner.scan(
                function (oResult) {
                    let txtRes = oResult.text;
                    console.log("O que foi digitado: " + txtRes);
                    // MessageBox.information(`Leitura do QR Code = ${txtRes}`);

                    this.onLoad(txtRes)
                }.bind(this),
                function (oError) {
                    console.log("2" + oError)
                },
                function (oResult) {
                    console.log("O que está sendo digitado: " + oResult.newValue)
                }
            );
        },
        onLoad: function (dados) {
            console.log(dados)
            if (dados == undefined || dados != "produtos") {
                MessageBox.error("Dados não encontrados");
            } else {
                const produtos = [
                    { OrderID: 103 },
                    { OrderID: 106 },
                    { OrderID: 109 }
                ]
                const model = new JSONModel(produtos);
                this.getView().setModel(model, "modelTest");
            }
        },
        onSearch: function (oEvent) {
            console.log(oEvent)
            var aFilters = [];
            var sQuery = oEvent.getSource().getValue();
            if (sQuery && sQuery.length > 0) {
                var filter = new Filter({
                    filters: [
                        new Filter("OrderID", FilterOperator.EQ, sQuery),
                    ],
                    and: false
                })
                aFilters.push(filter);
            }
            var oList = this.byId("listTest");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilters);
        },
        onDetail: function (evt) {
            var oList = evt.getSource().getBindingContext("modelTest").getObject()
            console.log(oList)
            MessageBox.information(`Quando clicar aqui vai baixar um PDF- Ordem: ${oList.OrderID}`);
        }
    });
});