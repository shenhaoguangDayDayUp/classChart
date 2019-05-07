var vm = new Vue({
  el: "#month",
  data: {
      currentMonth:new Date().getMonth(),
      currentYear:new Date().getFullYear(),
      styleOfDays:[],
      rowsInMonth:[],

  },
  created: function() {
   this.renderChart()
     
  },
  methods: {
      //回到当前月份
    resetMonth(){
      this.currentYear = new Date().getFullYear()
      this.currentMonth = new Date().getMonth()
      this.renderChart()
    },
 
     //切换到上一个月
      prevMonth() {
        if (this.currentMonth == 0) {
          this.currentYear =   --this.currentYear
          this.currentMonth = 11
        } else {
          this.currentMonth = --this.currentMonth
        }
        this.renderChart()
      },
       //切换到下一个月
      nextMonth() {
        if (this.currentMonth  === 11) {
          this.currentYear =   ++this.currentYear
          this.currentMonth = 0
        } else {
          this.currentMonth = ++this.currentMonth
        }
        this.renderChart()
      },
    renderChart(){
      let month =  this.displayDaysPerMonth(this.currentYear)[this.currentMonth],//当前月份展示数据
      rowsInMonth = [],
      i = 0,
      styleOfDays = (()=> { 
        let i = month.indexOf(1),//获取当月第一天 在数组中的位置
          j = (month.indexOf(1, i + 1)==-1)?month.length:month.indexOf(1, i + 1);//获取后面一个月 第一天在数组中的位置
        const arr = [];
        for(let ii=0;ii<month.length;ii++){
          arr.push(null);
        }
        let newarr=arr.map((item,index)=>{ // 判断是在哪个月
          if(index<i){
            return 'prevMonth'
          }else if(index>=i&&index<j){
            return 'thisMonth'
          }else{
            return 'nextMonth'
          }
        })
        return newarr//区分日历中的 上月、当月、下月
      })()
      this.styleOfDays = styleOfDays
      console.log( this.styleOfDays)
      //把每一个月的显示数据以7天为一组等分
      month.forEach((day, index)=> {
        if (index % 7 === 0) {
          rowsInMonth.push(month.slice(index, index + 7))
        }
      })
      this.rowsInMonth = rowsInMonth
 

    },
    //计算每年月份中的天数
  calcDaysInMonth(year){
      let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          daysInMonth[1] = 29
        }
       return daysInMonth;
    },
    //计算每个月上个月天数
  calcDaysMonthPrevious(year){
    const daysInMonth= this.calcDaysInMonth(year)
    //daysInPreviousMonth保存上一个月的天数
    let daysInPreviousMonth = [].concat(daysInMonth)
    daysInPreviousMonth.unshift(daysInPreviousMonth.pop())
    return daysInPreviousMonth;
  },
  //计算每个月需要补充的天数
  calcDaysMonthAdd(year){
    //addDaysFromPreMonth每个月需要补足上个月的天数
    let addDaysFromPreMonth = new Array([],[],[],[],[],[],[],[],[],[],[],[])
      .map((item, index)=> {
        let day = new Date(year, index, 1).getDay()
        if (day === 0) {//星期天 补六天
          return 6
        } else {
          return day - 1
        }
      }) 
      return addDaysFromPreMonth;
  },
   displayDaysPerMonth(year){
    const daysInMonth= this.calcDaysInMonth(year);
    const daysInPreviousMonth= this.calcDaysMonthPrevious(year);
    const addDaysFromPreMonth= this.calcDaysMonthAdd(year);
    //以数组形式返回一年中每个月的显示数据,每个数据为6行*7天
    return new Array([],[],[],[],[],[],[],[],[],[],[],[])
      .map((month, monthIndex)=> {
        let addDays = addDaysFromPreMonth[monthIndex],
          daysCount = daysInMonth[monthIndex],
          daysCountPrevious = daysInPreviousMonth[monthIndex],
          monthData = []
        //补足上一个月
        for (; addDays > 0; addDays--) {
          monthData.unshift(daysCountPrevious--)
        }
        //添入当前月
        for (let i = 0; i < daysCount;) {
          monthData.push(++i)
        }
        //补足下一个月 初始化 总天数为42
        //判断下个月可填充天数 大于6则总天数为35
        let leftDays=42-monthData.length;
        if(leftDays>6){
          leftDays=35-monthData.length;
        }
        for (let j = 0; j < leftDays;) {
          monthData.push(++j)
        }
        return monthData
      })
  },
   displayDaysPerMonthDetail(year){
    const daysInMonth= this.calcDaysInMonth(year);
    const daysInPreviousMonth=this.calcDaysMonthPrevious(year);
    const addDaysFromPreMonth= this.calcDaysMonthAdd(year);
    //以数组形式返回一年中每个月的显示数据,每个数据为6行*7天
    return new Array([],[],[],[],[],[],[],[],[],[],[],[])
      .map((month, monthIndex)=> {
        let addDays = addDaysFromPreMonth[monthIndex],
          daysCount = daysInMonth[monthIndex],
          daysCountPrevious = daysInPreviousMonth[monthIndex],
          monthData = [];
          
        // //补足上一个月
        for (; addDays > 0; addDays--) {
          if(monthIndex==0){
            const showyear=year-1;
            monthData.unshift(showyear+'年'+'12月'+(daysCountPrevious--)+'日')
          }else{
            const showyear=year;
            monthData.unshift(showyear+'年'+monthIndex+'月'+(daysCountPrevious--)+'日')
          }
          
        }
        // //添入当前月
        for (let i = 0; i < daysCount;i++) {
          monthData.push(year+'年'+(monthIndex+1)+'月'+(i+1)+'日')
        }
        // //补足下一个月 初始化 总天数为42
        // //判断下个月可填充天数 大于6则总天数为35
        let leftDays=42-monthData.length;
        if(leftDays>6){
          leftDays=35-monthData.length;
        }
        for (let j = 0; j < leftDays;j++) {
          if(monthIndex==11){
            monthData.push((year+1)+'年'+'1月'+(j+1)+'日')
          }else{
            monthData.push(year+'年'+(monthIndex+2)+'月'+(j+1)+'日')
          }
        }
        return monthData
      })
  }
  },
  
  
})