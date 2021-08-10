BusyIndicator.show()

const service = "/Northwind/V2/Northwind/Northwind.svc/"
this.odata = new ODataModel(service)
this.odata.read("/Orders", {
    success: function (response) {
        console.log(response.results)
        const model = new JSONModel(response.results)
        this.getView().setModel(model, "modelTest")
        BusyIndicator.hide()
    }.bind(this),

    error: function (error) {
        console.error(error)
        BusyIndicator.hide()
    }
})