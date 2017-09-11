AFRAME.registerComponent("indicator", {
    schema: {
        variable: {type: "string"},
        onColour: {type: "color"},
        offColour: {type: "color"}
    },
    
    init: function(){
        this.el.setAttribute("geometry", {
            radius: 0.5,
            height: 0.5,
            primitive: "cylinder"
        });
        
        var isOn = window.lostVars[this.data.variable]
        this.setMaterial(isOn);
        
        var _this = this;
        this.el.addEventListener("activated", function(){
            _this.setMaterial(true);
        });
    },
    
    setMaterial: function(isOn){
        this.el.setAttribute("material", {
           color: isOn ? this.data.onColour : this.data.offColour 
        });
    }
});