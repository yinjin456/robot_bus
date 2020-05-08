<template>
    <div>
        该页面正在构建中。。。
    </div>
</template>

<script>
    export default {
        name: "Building",
        data(){
            return{
                datas:"[[3,2],[4,5],[6,7]]"
            }
        },
        methods:{
            test(){
                console.log(this.datas)
                var arr = eval(this.datas)
                console.log(arr[0][1])
            },

        },
        mounted(){
            this.test()
        }
    }
</script>

<style scoped>

</style>