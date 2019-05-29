   let app = new Vue({
        el: "#app",
        data() {
            return {
                color: ['red', 'red', 'green', 'green',
                    'blue', 'blue', 'yellow', 'yellow',
                    'purple', 'purple', 'orange',
                    'orange', 'gray', 'gray', 'RosyBrown', 'RosyBrown'
                ],

                start: true,

                flag: -1,

                open: [{ show: false }, { show: false }, { show: false }, { show: false },
                { show: false }, { show: false }, { show: false }, { show: false },
                { show: false }, { show: false }, { show: false }, { show: false },
                { show: false }, { show: false }, { show: false }, { show: false }],

                countdown: 4,
                sec: 0,
                normsec: '00',
                min: 0,
                normmin: '00',
                hour: 0,
                normhour: '00',

                par: [],
                countPar:  0,
            }
        },
        created() {
            this.color.sort(this.compareRandom); //Вызываем функцию, которая отсортирует массив из color в случайном порядке 
        },
        methods: {
            // функция, которая перетасовывает массив
            compareRandom(a, b) {
                return Math.random() - 0.5;
            },

            /* метод, изменяющий цвет выбранного квадрата. Открываем цвет белого квадрата. 
            Условие нужно для того, чтобы не открывать закрашенные квадраты */
            changeStatus(a, event) {
                if (this.open[a].show == false) {
                    var chosen = event.target; // Получаем доступ ко всем свойствам выбранного элемента
                    this.open[a].show = !this.open[a].show; // меняем свойство на противоположное
                    this.par.push(chosen); // добавляем выбранный элемент в массив для сравнения.

                    setTimeout(this.checkStatus, 1); // Вызываем метод, который будет возвращать стус открытых квадратов.
                }
            },

            checkStatus() {
                // если в массиве два объекта, то нужно сравнить их классы
                if (this.par.length == 2) {
                    
                    // если классы по цвету одинаковые, то обнуляем массив с выбранными элементами
                    if (this.par[0].classList[2] == this.par[1].classList[2]) {
                        this.countPar+=1;
                        this.par.length = 0;
                    }
                    /* В противоположном случае цвета разные, вызываем метод, который сработает 
                    с задержкой и окрасит в белый через 200 мс, чтобы игрок успел увидеть, что цвета
                    не одного цвета */
                    else {
                        // console.log('цвета разные');
                        setTimeout(this.setWhite, 200);
                    }
                }
            },
            /*метод, который окрашивает квадраты в белый цвет и обнуляем массив 
            для сравнения двух квадратов*/

            setWhite() {
                this.open[this.par[0].id].show = !this.open[this.par[0].id].show;
                this.open[this.par[1].id].show = !this.open[this.par[1].id].show;
                this.par.length = 0;
            },

            /*метод на кнопку, чтобы начать игру. Перед стартом игроку показывается, 
            где какие квадраты располагаются */
            showColor() {
                this.start = !this.start;
                this.open.forEach(element => {
                    element.show = true;
                });
                // через 3с цвета будут сброшены в белый
                setTimeout(this.openBaseLine, 3000);
                // функция для обратного отсчета
                this.startGame();
                //функция для секундромера
                this.incrTime();
            },
            openBaseLine() {
                this.open.forEach(element => {
                    element.show = false;
                });
            },
            //Метод для начала игры, запускает обратный отсчет 
            startGame() {
                if (this.countdown > 0) {
                    this.countdown = this.countdown - 1;
                    this.flag += 1;
                    setTimeout(this.startGame, 1000);
                }

            },
            //Метод для секундомера
            incrTime() {
                if (this.flag > 2) {
                    this.sec += 1;
                    if (this.sec < 10) {
                        this.normsec = '0' + this.sec;
                    }
                    else {
                        if (this.sec % 60 < 10) this.normsec = '0' + this.sec % 60;
                        else this.normsec = this.sec % 60;
                    }

                    console.log(this.min);
                    this.min = Math.trunc(this.sec / 60);
                    if (this.min < 10) {
                        this.normmin = '0' + this.min;
                    }
                    else {
                        if (this.min % 60 < 10) this.normmin = '0' + this.min % 60;
                        else this.normmin = this.min % 60;
                    }

                    this.hour = Math.trunc(this.min / 60);
                    if (this.hour < 10) {
                        this.normhour = '0' + this.hour;
                    }
                    else {
                        if (this.hour % 60 < 10) this.normhour = '0' + this.normhour % 60;
                        else this.normhour = this.hour % 60;
                    }


                }
                if (this.countPar==8){
                    return alert('Победа!'+'Вы затратили: '+ this.normhour+':'+this.normmin+':'+this.normsec)
                }

                setTimeout(this.incrTime, 1000);
            },

        }
    })