<template>
    
        <div class="message-content">
            <div class="message-userContent">
                <div class="message-fields message-fields--before">
                <dl class="pairs pairs--columns pairs--fixedSmall pairs--customField">
                    <img class="book-img" :src="book.imageLink">
                </dl>
                <h1 class="message-fields--before .pairs.pairs--columns.pairs--fixedSmall">{{book.name}}</h1>
                <dl class="message-fields--before .pairs.pairs--columns.pairs--fixedSmall">Tác giả: {{book.alias.name}}</dl>
                </div>
                <div class="cate">
                <p>Thể loại: </p>
                <dl v-for="category in book.categories"
                :key="category">
                    {{category.name}} 
                    </dl>
                <br/>
                </div>
                <div class="cate">
                     Tình trạng: <dl>{{book.bookStatus.name}}</dl>
                </div>
            <div>
                <dl>{{book.description}}</dl>
            </div>
            </div>
        </div>
    <div>
        <chapter-in-book-block 
        v-for="chapter in data"
        :key="chapter.id"
        v-bind:chapter="chapter">
            {{chapter.name}}
        </chapter-in-book-block>
    </div>
</template>

<script>
import axios from "axios"
import ChapterInBookBlock from '@/components/ChapterInBookBlock.vue';
    export default{
  components: { ChapterInBookBlock },
        name: "BookInformationBlock",
        props: ["book"],
        data(){
            return {
                bookId: this.$route.query.id,
                data: {}
            }
        },
        created(){
            this.listChapters();
        },
        methods: {
            listChapters(){
                axios
                    .get("http://localhost:8000/chapter", {
                        headers: {
                            bookId: this.bookId,
                        }
                    })
                    .then((response) =>{
                        this.data = response.data;
                        console.log(this.data);
                    });
            }
        }
    } 
</script>
<style>
    .column{
        display: flex;
        flex-direction: column;
        margin-left: 10px;
    }
    .book-img{
        height: 210px;
    }
    .message-content{
        position: relative;
        flex: 1 1 auto;
        min-height: 1px;
    }
    .message-userContent{

    }
    * {
        box-sizing: border-box;
    }
    .message-fields{
        margin: 10px 0;
    }
    .message-fields--before{
        border-bottom: 1px solid #d8d8d8;
        padding-bottom: 6px;

    }
    .message-fields--before dl{
        float: left;
        margin-right: 30px;
    }
    .pairs.pairs--column{
        display: table;
        table-layout: fixed;
        width: 100%;
    }
    .pairs{
        padding: 0px;
        margin: 0px;
        overflow: hidden;
        /* .dd{
            padding: 0px;
            margin: 0px;
        } */
    }
    .message-fields--before .pairs.pairs--columns.pairs--fixedSmall{
        font-size: 17px;
        padding-bottom: 6px;
        width: auto;
    }
    .cate{
        display: flex;
    }
</style>