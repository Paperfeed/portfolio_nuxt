<template>
    <section class="section">
    <form id="survey-form" class="content">
        <h1 id="title">Mind Providing Some Feedback?</h1>
        <p id="description">Here at <i>Aruderuto</i> we value your opinion! Please let us know what you think about us so that we can continue to improve our service. </br></br>Don't worry, we can take the criticism - so don't withhold any punches!</p>
        <div class='tab'>
            <h2 class='tab-title'>How can we contact you?</h2>
            <h3 class='tab-description'>We will only use this information to address or expand on any issues or concerns you might have.</h3>
            <div class='grid'>
                <label for="name" id='name-label'>Name*</label>
                <input type="text" id="name" placeholder='Jane Doe' required />
                <label for="email" id='email-label'>E-mail*</label>
                <input type="email" id="email" placeholder='email@example.com' required />
                <label for="number">Phone Number</label>
                <input type="tel" id="phone" min='0' max='99' placeholder="123-4567-8901"/>
                <label for="number" id='number-label'>Age</label>
                <input type="number" id="number" min='1' max='99' placeholder="18"/>
            </div>
        </div>

        <div class='tab'>
            <h2 class='tab-title'>What's your honest opinion?</h2>
            <div class='grid'>
                <label for='dropdown'>Where did you hear about us?</label>
                <select id="dropdown" @change="checkSelect">
                    <option disabled selected>Please select an option</option>
                    <option value='internet'>Internet</option>
                    <option value='friend'>Friend</option>
                    <option value='magic'>Magic</option>
                    <option value='other'>Other</option>
                </select>

                <label ref="dropdownOther" class='dropdown-other hidden'>Other? Please tell us more...</label>
                <input type='text' name='other' class='dropdown-other hidden'/>

                <label>Rate our service</label>
                <div class='ratings right-pane'>
                    <input type='checkbox' value='1' name='cblist'/>
                    <input type='checkbox' value='2' name='cblist'/>
                    <input type='checkbox' value='3' name='cblist'/>
                    <input type='checkbox' value='4' name='cblist'/>
                    <input type='checkbox' value='5' name='cblist'/>
                </div>

                <label>What gender are you?</label>
                <div class='radiogroup'>
                    <input id='male' type='radio' name='gender' value='male'/>
                    <label for='male'>Male</label>


                    <input id='female' type='radio' name='gender' value='female'/>
                    <label for='female'>Female</label>
                </div>

                <label for='comments'>Penny for your thoughts</label>
                <textarea name='comments' placeholder='Please share your thoughts with us. How can we improve? What do you like about us?'></textarea>
            </div>
        </div>
        <button id="submit">Submit</button>
    </form>
    </section>
</template>

<script>
    export default {
        name: 'survey-form',
        layout: 'portfolio',
        logoClass: 'black',
        info: {
            order: 10,
            name: 'Survey Form',
            description: 'Simple form design as practice',
            thumbnail: 'surveyform.png',
        },
        head: {
            link: [
                { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat|Neuton' }
            ]
        },

        mounted() {
            this.ratingElem = document.getElementsByName('cblist');
            this.ratingElem.forEach(elem => {
                elem.onclick = this.setRating.bind(this);
                elem.checked = true;
            });
        },

        methods: {
            checkSelect(e) {
                const elements = document.getElementsByClassName('dropdown-other');
                const toggle = e.target.value !== 'other';
                for (let i = 0, len = elements.length; i < len; i++) {
                    elements[i].classList.toggle('hidden', toggle);
                }
            },

            setRating(e) {
                this.ratingElem.forEach((elem, index) => elem.checked = (index < e.target.value))
            }
        }
    }
</script>

<style scoped lang="scss">
    body {
        margin: 0;
        font-family: 'Montserrat', 'sans-serif';
    }

    input, select {
        font-family: 'Montserrat', 'sans-serif';
        height: 40px;
        padding: 0 12px;
        background: #fbfbfb;
        border: 2px solid #eaeaea;
        border-radius: 3px;
    }

    .radiogroup {
        input {
            height: auto;
        }
    }

    #title {
        font-family: 'Neuton', 'serif';
        text-align: center;
        margin-bottom: 0;
        color: #60e4b8;
    }

    #description {
        text-align: justify;
        margin: 8px 8px 20px 8px;
    }

    #survey-form {
        display: flex;
        flex-direction: column;
        margin: auto;
        padding-bottom: 80px;
        width: 80vw;
        max-width: 600px;

        @media (max-width: 480px) {
            width: 100%;
        }

        label, .left-pane {
            grid-column: 1;
            text-align: right;
            color: #535a58;
            //justify-self: flex-end;
        }

        input, select, .right-pane, textarea {
            grid-column: 2;
        }

        textarea {
            height: 80px;
        }
    }

    @media (max-width: 480px) {
        #survey-form {
            label {
                text-align: center;
                min-width: 0;
            }

            input, select, .right-pane, textarea {
                grid-column: 1;
                min-width: 0;
            }

            .ratings {
                margin: auto;
            }

            .grid {
                grid-template-columns: 1fr;
            }
        }
    }


    .grid {
        display: grid;
        grid-template-columns: minmax(min-content, 0.5fr) 1fr;
        grid-gap: 10px;
        align-items: center;
    }

    .ratings {
        input {
            visibility: hidden;
            margin: 0;
            user-select: none;
            font-size: 30px;
            margin: 0 5px;

            &:before {
                visibility: visible;
                content: "🟊";
                color: lightgrey;
                position: absolute;
            }

            &:checked:before {
                content: "🟊";
                color: orange;
                position: absolute;
            }
        }
    }

    #submit {
        width: 150px;
        padding: 10px;
        border: 0;
        border-radius: 3px;
        background: aquamarine;
        color: white;
        text-transform: uppercase;
        font-weight: bold;
        align-self: flex-end;
        box-shadow: 0px 3px 20px 4px #d4d4d440;
        text-shadow: 0 0 6px #00000020;
        animation: fadeIn 1s ease-in-out;
        opacity: 0;
        animation-delay: 1s;
        animation-fill-mode: forwards;
    }

    .tab {
        animation: slideInBottom 1s ease-out;
        animation-fill-mode: forwards;
        opacity: 0;
        padding: 0 40px 30px 40px;
        margin-bottom: 20px;
        background: white;
        border-top: 4px solid aquamarine;
        border-radius: 3px;
        box-shadow: 0px 3px 20px 4px #d4d4d440;
    }

    .tab:nth-of-type(2) {
        animation-delay: .3s;
    }

    .tab-title {
        font-family: 'Neuton', 'serif';
        font-size: 1.5rem;
        font-weight: normal;
        margin: 20px 0 12px 0;

        &:after {
            display: block;
            content: '';
            padding-top: 10px;
        //margin: 0 -10px;
            border-bottom: 2px solid lightgrey;
        }
    }

    .tab-description {
        font-size: 12px;
        font-weight: normal;
        margin-bottom: 20px;
        color: #56c7a2;
    }

    .dropdown-other {
        position: relative;
        transition: opacity, transform;
        transition-duration: .5s;
        transition-timing-function: ease-in-out;
    }

    .hidden {
        height: 0;
        opacity: 0;
        visibility: hidden;
        margin: 0;
        transform: translateY(-100%);
    //position: fixed;
    //left: -1000%;
    }

    @keyframes slideInBottom {
        0% {transform: translateY(100%); opacity: 0;}
        100% { opacity: 1; }
    }

    @keyframes fadeIn {
        100% {opacity: 1;}
    }
</style>
