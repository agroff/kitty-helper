class KittyCard{

    constructor($kittyCard){
        this.$card = $kittyCard;
    }

    getContainer(){
        return this.$card.closest(".KittiesGrid-item");
    }

    getSpeed(){
        var speed = $(".KittyCard-coldown", this.getContainer()).text();
        speed = $.trim(speed).toLowerCase();
        return speed;
    }

    show(hideMethod='fade'){
        if(hideMethod === 'fade'){
            this.getContainer().css("opacity", "1");
        }
        else {
            this.getContainer().show()
        }
    }

    hide(hideMethod = 'fade'){
        if(hideMethod === 'fade') {
            this.getContainer().css("opacity", "0.2");
        }
        else {
            this.getContainer().hide();
        }

    }
}

export default KittyCard;