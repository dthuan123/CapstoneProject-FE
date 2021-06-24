<template>
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
                    v-for="row in tableData"
                    :key="row"
                    class="table-row"
                >
                    <td 
                        v-for="(col, index) in columnDefs"
                        :key="index"
                        :style="{ width: col.width ? col.width : 'auto' }"
                        :class="{'img-cell' : col.isImage}"
                    >
                        <div v-if="col.display" v-html="col.display" v-on:click="col.action(row)"></div>
                        <span v-else-if="col.isConditionalRendering">{{ row[col.field] ? col.fieldTrue : col.fieldFalse }}</span>
                        <span v-else-if="col.isObject">{{ row[col.object][col.field] }}</span>
                        <img v-else-if="col.isImage" :src="row[col.field]" class="table-img">
                        <span v-else-if="col.isDate">{{ row[col.field] ? row[col.field].split("T")[0] : ""}}</span>
                        <span v-else>{{ row[col.field] }}</span>
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
</template>

<script>
import axios from "axios"

export default {    
    name: "DataTable",
    props: ["columnDefs", "data", "paging", "url"], 
    data() {
        return {
            tableData: this.data,
            pagingSetting: this.paging,
            apiURL: this.url,
            currentPage: 0,
            totalPage: null
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
            axios
                .get(this.apiURL, {
                    headers: this.pagingSetting
                })
                .then((response) => {
                    this.tableData = response.data.content;
                    this.currentPage = response.data.pageable.pageNumber;
                    this.totalPage = response.data.totalPages;
                });
        },
        toPrevPage() {
            if(this.currentPage !== 0) {
                this.pagingSetting.page--;
            }
            this.getData();
        },
        toNextPage() {
            if(this.currentPage < this.totalPage - 1) {
                this.pagingSetting.page++;
            }
            this.getData();
        },
        setPage(pageIndex) {
            this.pagingSetting.page = pageIndex - 1;
            this.getData();
        }
    }
}
</script>

<style scoped>
.table-header {
    font-size: 1.5rem;
    vertical-align: text-top;
}
.table-row {
    font-size: 1.5rem;
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
</style>