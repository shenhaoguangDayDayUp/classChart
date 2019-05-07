var vm = new Vue({
    el: "#main",
    data: {
        today: "",
        activeDay: "",
        year: "",
        month: "",
        day: "",
        count: 0, //前一周后一周点击次数
        arr: [], //周日历,
        monthArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], //月份
        sureMonthFlag: false, //是否初始化月份
        sureYearFlag: false, //是否初始化年份
        selMonth: '',
        selYear: '',
    },
    created: function() {
        this.getData();
        this.getToday();
    },
    methods: {
        setCurrentWeek(){
            this.selMonth = ''
            this.selYear =''
            this.sureMonthFlag = false 
            this.sureYearFlag = false
            this.getData();
            this.getToday();
        },
        getToday: function() {
            var date = new Date();
            var year = date.getFullYear(); //年
            var month = date.getMonth(); //月 从0开始 0=》1月 1=》2月
            var day = date.getDate(); //日
            this.today = year + "," + Number(month + 1) + "," + day;
        },
        getData: function(obj) {
            var date = new Date();
            console.log(date)
            if (this.sureMonthFlag) {
                date = new Date(this.selYear, this.selMonth, 1);
            }
            if (this.sureYearFlag) {
                date = new Date(this.selYear, this.selMonth, 1);
            }
            if (obj) {
                if (obj.value == '1') { //前一周
                    this.count--;
                } else if (obj.value == '2') { //后一周
                    this.count++;
                }
            }
            var year = date.getFullYear(); //年
            var month = date.getMonth(); //月 从0开始 0=》1月 1=》2月
            var day = date.getDate(); //日
            console.log(day)
            this.day = day;
            var weekDay = date.getDay(); //是本周的第几天
            if (weekDay == 0) {
                weekDay = 6
            } else {
                weekDay = weekDay - 1
            }
            this.getWeek(year, month, day, weekDay);
        },
        getWeek: function(year, month, day, weekDay) {
            this.arr = [];
            for (var i = 0; i < 7; i++) {
                var temDate = new Date(year, month, day - weekDay + i + this.count * 7);
                var temYear = temDate.getFullYear(); //年
                var temMonth = temDate.getMonth(); //月 从0开始 0=》1月 1=》2月
                var temDay = temDate.getDate(); //日
                var temDate = temYear + "," + Number(temMonth + 1) + "," + temDay;
                var obj = {
                    "date": temDate,
                    "year": temYear,
                    "month": temMonth,
                    "day": temDay
                };
                this.arr.push(obj);
            }
            if (this.sureMonthFlag) {
                this.year = this.arr[6].year; //周日历数组的最后一个值的year为当前year
            } else {
                this.selYear = this.year = this.arr[6].year; //周日历数组的最后一个值的year为当前year
            }
            if (this.sureMonthFlag) {
                this.month = this.arr[6].month; //周日历数组的最后一个值的month为当前month
            } else {
                this.selMonth = this.month = this.arr[6].month; //周日历数组的最后一个值的month为当前month
            }
            this.month = this.arr[6].month; //周日历数组的最后一个值的month为当前month
            this.day = this.arr[6].day; //周日历数组的最后一个值的day为当前day
        },
        //确定日期
        sureDay: function(value) {
            this.activeDay = value; //根据此值去发送请求即可
        },
        //确定月份
        sureMonth: function(item) {
            this.count = 0;
            this.selMonth = item;
            this.sureMonthFlag = true;
            this.sureYearFlag = false;
            this.selYear = this.year;
            this.getData();
        },
        //确定年份
        sureYear: function(value) {
            this.count = 0;
            this.sureYearFlag = true;
            this.sureMonthFlag = false;
            this.selMonth = this.month;
            if (value == 1) {
                this.year--;
            } else {
                this.year++;
            }
            this.selYear = this.year;
            this.getData();
        }
    }
})