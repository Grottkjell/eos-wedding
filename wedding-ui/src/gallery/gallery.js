import Vue from "vue/dist/vue";
import axios from "axios";

const slidesPerView = 5, slidesPerColumn = 3;

const galleryComponent = {
    data: () => ({
        images: [],
        currentPageNumber: 0,
        totalNrOfImages: 0,
        activeIndex: 0
    }),
    created() {
        this.getImages();
    },
    computed: {
    },
    methods: {
        getImages () {
            return axios
                .get(
                    "images",
                    {
                        params: {
                            currentPageNumber: this.currentPageNumber++, imagesPerPage: slidesPerView
                        }
                    }
                )
                .then((response) => {
                    this.images = this.images.concat(response.data.images);
                    this.totalNrOfImages = response.data.totalNrOfImages;
                });
        },
        updateGallery() {
            this.getImages();
        },
        viewImage(indexOfImageToView) {
            this.activeIndex = indexOfImageToView;
            if (this.activeIndex >= (this.images.length - 1) && this.activeIndex < (this.totalNrOfImages - 1)) {
                this.updateGallery();
            }
        },
        viewPreviousImage() {
            if ((this.activeIndex - 1) === -1) {
                return;
            }

            this.viewImage(this.activeIndex - 1);
        },
        viewNextImage() {
            if ((this.activeIndex + 1) === this.totalNrOfImages) {
                return;
            }

            this.viewImage(this.activeIndex + 1);
        }
    }
}


Vue.component(
    "eos-gallery",
    function (resolve) {
        axios
            .get("/gallery/gallery.html")
            .then((response) => {
                resolve({
                    ...galleryComponent,
                    template: response.data
                });
            });
    }
);