import Vue from "vue/dist/vue";
import axios from "axios";

const slidesPerView = 5;

let modalInitialized = false;

const galleryComponent = {
    props: {
        folder: String
    },
    data: () => ({
        images: [],
        currentPageNumber: 0,
        totalNrOfImages: 0,
        activeIndex: 0,
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
                    `images/${this.folder}`,
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
            if (indexOfImageToView === this.activeIndex) {
                this.openImageModal(indexOfImageToView);
            }
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
        },
        openImageModal(indexOfImageToView) {
            let modal;
            if (!modalInitialized) {
                const appRoot = document.querySelector('#app');
                modal = document.querySelector('#gallery-root>.image-modal-container')
                appRoot.appendChild(modal);
                modalInitialized = true;
            } else {
                modal = document.querySelector('#app>.image-modal-container');
            }
            modal.querySelector('img').src = `images/${this.folder}/${this.images[indexOfImageToView]}`;
            modal.style.display = 'block';
        },
        closeImageModal() {
            const modal = document.querySelector('#app>.image-modal-container');
            modal.style.display = 'none';
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