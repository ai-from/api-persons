import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.esm.browser.js'

const VESTI2_API = 'https://cdnapi.smotrim.ru/api/v1/boxes/vesti2'

const vm = new Vue({
    el: '#app',
    data: {
        persons: [],
        isInfo: false,
        currPerson: {},
        infoContent: ''
    },
    methods: {
        async getPersons() {
            let response = await fetch(VESTI2_API);
            let json = await response.json();
            let data = json.data;
            let personsBlock = await data.content.filter(item => item.alias === 'vesti3-persons');
            let persons = personsBlock[0].content

            this.persons = persons;
        },
        async showInfo(e) {
            if(e.target.getAttribute('data-person-id') !== null && e.target.getAttribute('data-person-id') !== '') {
                this.currPerson = this.persons.filter(item => item.id === Number(e.target.getAttribute('data-person-id')))[0];
                let response = await fetch(`https://cdnapi.smotrim.ru/api/v1/persons/${this.currPerson.id}`);
                let json = await response.json();
                let data = json.data;
                this.infoContent = data.body;
                this.isInfo = true;
            }
        },
        closeInfo() {
            this.isInfo = false;
        }
    },
    async mounted() {
        await this.getPersons()
        $(document).ready(function(){
            $('#carousel').slick({
                slidesToShow: 8,
                prevArrow: '<div class="arrow-prev"><img src="img/arrow.svg"></div>',
                nextArrow: '<div class="arrow-next"><img src="img/arrow.svg"></div>'
            });
        });
    }
})