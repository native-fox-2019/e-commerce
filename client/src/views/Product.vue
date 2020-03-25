<template>
    <b-container>
        <b-row>
            <b-col sm="3">
                <b-list-group>
                    <b-list-group-item href="#">All</b-list-group-item>
                    <b-list-group-item href="#">Gym</b-list-group-item>
                    <b-list-group-item href="#">Lifestyle</b-list-group-item>
                    <b-list-group-item href="#">Hehe</b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col sm="9">
                <b-row>
                    <b-card
                        title="Sepatu hehe"
                        img-src="/sepatu.jpg"
                        img-alt="Image"
                        class="mb-4 col-sm-3 ml-5"
                        v-for="i in [1,2,3,4,5]" :key="i">
                        <b-card-text>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                        </b-card-text>

                        <router-link to="/product-detail">
                            <b-button variant="primary">Go somewhere</b-button>
                        </router-link> 
                    </b-card>
                </b-row>
                 <b-row class="justify-content-md-center mb-5"> 
                    <button class="btn btn-success">View more product</button>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>