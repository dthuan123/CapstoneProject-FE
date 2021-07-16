<template>
    <div class="container">   
        <div class="search-form">
            <input
                class="form-search-field"
                type="search"
                placeholder="Tìm kiếm"
                aria-label="Search"
                v-model="searchKeyword"
            />
            <button class="form-search-button" @click="search">
                <font-awesome-icon icon="search"></font-awesome-icon>
            </button>
        </div>
        <div class="table-responsive">
            <table class="table table-hover table-bordered">
                <thead class="table-header">
                    <tr>
                        <th 
                            v-for="(col, index) in columnDefs"
                            :key="index"
                            :style="{ width: col.width ? col.width : 'auto' }"
                            
                        >
                            {{ col.header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(row) in tableData"
                        :key="row"
                        class="table-row"
                    >
                        <td 
                            v-for="(col, index) in columnDefs"
                            :key="index"
                            :style="{ width: col.width ? col.width : 'auto' }"
                            :class="{'img-cell' : col.isImage, 'cell' : true}"
                        >
                            <div v-if="col.deleteDisplay" v-html="col.deleteDisplay" v-on:click="deleteChapter(row)"></div>
                            <div v-else-if="col.display" v-html="col.display" v-on:click="col.action(row)"></div>
                            <span v-else-if="col.isConditionalRendering">{{ row[col.field] ? col.fieldTrue : col.fieldFalse }}</span>
                            <span v-else-if="col.isObject">{{ row[col.object][col.field] }}</span>
                            <img v-else-if="col.isImage" :src="row[col.field]" class="table-img">
                            <span v-else-if="col.isDate">{{ row[col.field] ? formatDate(row[col.field]) : ""}}</span>
                            <router-link v-else-if="col.field === 'name'" :to="'/books?id=' + row.id">{{row[col.field]}}</router-link>
                            <span class="word-cell" v-else>{{ row[col.field] }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="row-end">
                <ul class="pagination">
                    <li @click="setPage(1)" :class="{'disabled': currentPage <= 0, 'page-item': true}"><a class="page-link">First</a></li>
                    <li @click="toPrevPage" :class="{'disabled': currentPage <= 0, 'page-item': true}"><a class="page-link">Prev</a></li>
                    <li v-for="page in pages" :key="page.name" :class="{ 'active': currentPage === page.name - 1, 'page-item': true}">
                        <a class="page-link" @click="setPage(page.name)">{{ page.name }}</a>
                    </li>
                    <li v-show="currentPage !== totalPage" @click="toNextPage" class="page-item"><a class="page-link">Next</a></li>
                    <li @click="setPage(totalPage)" class="page-item"><a class="page-link">Last</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {    
    name: "DataTable",
    props: ["columnDefs", "page", "pageSize", "url", "headerOption"], 
    data() {
        return {
            tableData: [],        
            creatorId: this.$store.state.user.id,
            currentPage: 0,
            totalPage: null,
            searchKeyword: ""
        }
    },
    computed: {
        pages() {
            const pages = [];

            let current = this.currentPage + 1;
            for (let i = current - 2; i < current; i++) {
                if(i > 0) {
                    pages.push({
                        name: i,
                        isDisabled: false
                    })
                }
            }
            pages.push({
                name: current,
                isDisabled: true
            })
            for (let i = current + 1; i <= current + 2; i++) {
                if(i <= this.totalPage) {
                    pages.push({
                        name: i,
                        isDisabled: false
                    })
                }
            }

            return pages;
        }
    },
    created() {
        this.getData();
    },
    methods: {
        setHeader() {
            let headers = {
                    page: this.currentPage,
                    pageSize: this.pageSize,
                    searchKeyword: encodeURIComponent(this.searchKeyword)
                }
            
            this.headerOption.forEach(option => {
                headers[option.name] = option.value
            })

            return headers;
        },
        getData() {
            axios
                .get(this.url, {
                    headers: this.setHeader()
                })
                .then((response) => {
                    this.tableData = response.data.content;
                    this.currentPage = response.data.pageable.pageNumber;
                    this.totalPage = response.data.totalPages;
                });
        },
        search() {
            this.currentPage = 0;
            this.getData();
        },
        toPrevPage() {
            if(this.currentPage !== 0) {
                this.currentPage--;
            }
            this.getData();
        },
        toNextPage() {
            if(this.currentPage < this.totalPage - 1) {
                this.currentPage++;
            }
            this.getData();
        },
        setPage(pageIndex) {
            this.currentPage = pageIndex - 1;
            this.getData();
        },
        formatDate(date) {
            date =  date.split("T")[0];
            return date.split("-").reverse().join("-");
        },
        deleteChapter(row) {
          axios
            .delete("http://localhost:8000/creator/delete/chapter", {   
              headers: {
                  chapterId: row.id
              }
            })
            .then((response) => {
              this.getData();
            });
        }
    }
}
</script>

<style scoped>
.container {
    padding: 2rem;
}

.table-header {
    font-size: 1.5rem;
    vertical-align: text-top;
}
.table-row {
    font-size: 1.5rem;
    height: 50px;
}
.img-cell {
    width: 15rem;
    height: 20rem;
}

.table-img {
    width: 100%;
    height: auto;
}

.pagination-container {
    display: flex;
}

.row-end {
    display: flex;
    justify-content: flex-end;
}

.cell {
    height: 20rem;
    overflow: hidden;
    text-overflow: ellipsis;
  
}

.search-form {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 2rem;
}

.form-search-field {
    width: 20%;
    height: 3rem;
    border-radius: 3rem;
    border: none;
    padding-right: 5rem;
    padding-left: 2rem;
    background-color: #e0e0e0;
    vertical-align: baseline;
}

.form-search-button {
    position: absolute;
    right: 2rem;
    border: none;
    background-color: transparent;
    height: 3rem;
    width: 4rem;
}

.word-cell {
    height: 50px;
    word-wrap: break-word;
  
}
</style>