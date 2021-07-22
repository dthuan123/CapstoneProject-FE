<template>
    <div>
        <div v-if="pagingSetting.issearchKeyword" class="search-form">
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
         <div class="table-responsive" >
            <table class="table table-hover table-bordered"  v-if="tableData.length > 0">
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
                    v-for="row in tableData"
                    :key="row"
                >
                    <td 
                        v-for="(col, index) in columnDefs"
                        :key="index"
                    >
                        <div v-if="col.display == true" v-html="col.displayTT" v-on:click="col.action(row)"></div>
                        <div v-else-if="col.isTT == true" v-html="row[col.field] ? col.fieldTrue : col.fieldFalse" v-on:click="col.action(row)"></div>
                        <div v-else-if="col.isTTUser == true &&  row['role']['id'] != 3" v-html="row[col.field] ? col.fieldTrue : col.fieldFalse" v-on:click="col.action(row)"></div>
                        <div v-else-if="col.isTTUser == true &&  row['role']['id'] == 3"></div>
                        <div v-else-if="col.isapproved == true  &&  row['role']['id'] != 3" v-html="row[col.field] ? col.fieldTrue : col.fieldFalse" v-on:click="col.action(row)"></div>
                        <div v-else-if="col.isapproved == true &&  row['role']['id'] == 3"></div>
                        <div v-else-if="col.isstatusIdRP == true" v-html="row['statusId']['statusId'] == 2 ? col.fieldTrue : col.fieldFalse" v-on:click="col.action(row)"></div>
                        <span v-else-if="col.isConditionalRendering">{{ row[col.field] ? col.fieldTrue : col.fieldFalse }}</span>
                        <span v-else-if="col.isDate">{{ row[col.field] ? formatDate(row[col.field]) : ""}}</span>
                        <span v-else-if="col.TT"><span v-if="row['role']">{{ row['role']['name'] }}</span></span>
                        <span v-else-if="col.bookStatus"><span v-if="row['bookStatus']">{{ row['bookStatus']['name'] }}</span></span>
                        <span v-else-if="col.alias"><span v-if="row['alias']">
                            
                             <router-link :to="{ name: 'AdminUserList', params: { id: row['alias']['id']  }}">{{ row['alias']['name'] }}</router-link>
                            </span></span>
                        <span v-else-if="col.book"><span v-if="row['book']">
                            <router-link :to="{ name: 'AdminBookList', params: { id: row['book']['name']  }}">{{row['book']['name']}}</router-link>
                            </span></span>
                        <span v-else-if="col.userSender"><span v-if="row['userSender']">{{ row['userSender']['name'] }}</span></span>
                        <span v-else-if="col.statusId"><span v-if="row['statusId']">{{ row['statusId']['statusName'] }}</span></span>
                        
                        <span v-else>{{ row[col.field] }}</span>
                        
                    </td>
                </tr>
            </tbody>
        </table>
         <div class="row-end"  v-if="tableData.length > 0">
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
        <h2 v-if="tableData.length === 0">
                Không có dữ liệu.
            </h2>
    </div>
</template>

<script>
import axios from "axios"

export default {    
    name: "DataTable",
    props: ["columnDefs", "data", "paging", "url"],
    data() {
        return {
            tableData: [],   
            pagingSetting: this.paging,
            apiURL: this.url,
            currentPage: 0,
            totalPage: null,
            searchKeyword: this.searchKeyword
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
        getData() {
            this.pagingSetting.searchKeyword = decodeURIComponent(this.pagingSetting.searchKeyword);
            axios
                .post(this.apiURL, this.pagingSetting
                )
                .then((response) => {
                    this.tableData = response.data.content;
                    this.currentPage = response.data.pageable.pageNumber;
                    this.totalPage = response.data.totalPages;
                })
                .catch((response)=>{
                    alert(response);
                })
                ;
        },
        toPrevPage() {
            if(this.currentPage !== 1) {
                this.pagingSetting.page--;
            }
            this.getData();
        },
        toNextPage() {
            if(this.currentPage !== this.totalPage) {
                this.pagingSetting.page++;
            }
            this.getData();
        },
        setPage(pageIndex) {
            this.pagingSetting.page = pageIndex - 1;
            this.getData();
        },
         formatDate(date) {
            date =  date.split("T")[0];
            return date.split("-").reverse().join("-");
        },
        search() {
            this.pagingSetting.searchKeyword = this.searchKeyword;
            this.currentPage = 0;
            this.getData();
        },
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