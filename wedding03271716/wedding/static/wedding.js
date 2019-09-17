var app = new Vue({
    el: '#app',
    data: {
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
        wishlist: [],
    },
    created() {
        this.getWishlist();
        setInterval(function() {
            var endtime = 'July 20 2019 16:00:00 GMT+0100';
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor( (t/1000) % 60 );
            var minutes = Math.floor( (t/1000/60) % 60 );
            var hours = Math.floor( (t/(1000*60*60)) % 24 );
            var days = Math.floor( t/(1000*60*60*24) );

            this.seconds = seconds;
            this.minutes = minutes;
            this.hours = hours;
            this.days = days;
        }.bind(this), 1000);
    },
    methods: {
        onChange(id) {
            axios
            .put("/api/update/" + id)
            .then(function(response) {
                console.log("uppdaterat");
                var item = this.wishlist.find(function(item) {
                    return item.id === id;
                });
                if (item) {
                    item.selected = true;
                }
            }.bind(this))
            .catch(function() {
                console.log("catch");
            })
            .then(function() {
                console.log("then");
            });
        },
        showDialog(id){
            var r = confirm("Fortsätter du kommer presenten att vara vald av dig, du kan inte själv välja bort den efter du gjort ett val.");
            if (r == true) {
                this.onChange(id);
            } else {
                event.target.selected = !event.target.selected;
            }
        },
        getWishlist() {
          axios
            .get("/api/wishlist", {})
            .then(function(response) {
              this.wishlist = response.data.wishlist;
            }.bind(this))
            .catch(function() {})
            .then(function() {
            });
        },
    }
    
});