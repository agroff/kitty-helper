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

    show(hideMethod='fadeOut'){
        if(hideMethod === 'fadeOut'){
            this.getContainer().css("opacity", "1");
        }
        else {
            this.getContainer().show()
        }
    }

    hide(hideMethod = 'fadeOut'){
        if(hideMethod === 'fadeOut') {
            this.getContainer().css("opacity", "0.2");
        }
        else {
            this.getContainer().hide();
        }

    }
}

export default KittyCard;