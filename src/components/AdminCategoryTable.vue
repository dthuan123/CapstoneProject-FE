<template>
    <div class="container">   
        <div class="c-header">
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
        <button class="btn btn-primary" @click="showModal = true">Thêm thể loại mới</button>  
        </div>
        
        <div class="table-responsive" v-if="tableData.length > 0">
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
                        >
                            <router-link v-if="col.field === 'name'" :to="'/category?id=' + row.id">{{row[col.field]}}</router-link>
                            <span class="word-cell" v-else>{{ row[col.field] }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="row-end" v-if="tableData.length > 0">
                <ul class="pagination">
                    <li @click="setPage(1)" :class="{'disabled': currentPage <= 0, 'page-item': true}"><a class="page-link">Trang đầu</a></li>
                    <li @click="toPrevPage" :class="{'disabled': currentPage <= 0, 'page-item': true}"><a class="page-link">Trang trước</a></li>
                    <li v-for="page in pages" :key="page.name" :class="{ 'active': currentPage === page.name - 1, 'page-item': true}">
                        <a class="page-link" @click="setPage(page.name)">{{ page.name }}</a>
                    </li>
                    <li v-show="currentPage !== totalPage" @click="toNextPage" class="page-item"><a class="page-link">Trang tiếp</a></li>
                    <li @click="setPage(totalPage)" class="page-item"><a class="page-link">Trang cuối</a></li>
                </ul>
            </div>
        </div>
        <h2 v-if="tableData.length === 0">
                Không có dữ liệu.
        </h2>
        <div class="alias-modal-wrapper" v-if="showModal">
            <div class="alias-modal-container">
                <div class="modal-field">
                    <input type="text" class="form-control" placeholder="Tên thể loại..." v-model="categoryName">
                </div>
                <div class="alert alert-danger" role="alert" v-show="error">
                    Alias name already exists!
                </div>
                <div class="alert alert-success" role="alert" v-show="success">
                    Thành công!
                </div>

                <div class="modal-button">
                    <button class="btn btn-outline-secondary" @click="createCategory">Lưu</button>
                    <button class="btn btn-outline-secondary" @click="closeModal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {    
    name: "AdminCategoryTable",
    props: ["columnDefs", "page", "pageSize", "url", "headerOption"], 
    data() {
        return {
            tableData: [],        
            creatorId: this.$store.state.user.id,
            currentPage: 0,
            totalPage: null,
            searchKeyword: "",
            showModal: false,
            categoryName: "",
            success: false, 
            error: false
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
        closeModal() {
            this.showModal = false;
            this.success = false;
            this.error = false;
        },
        createCategory() {
            let body = {
                name: this.categoryName,
            }
            axios
                .post("http://localhost:8000/admin/categories", body)
                .then((res) => {
                    this.getData();
                    this.success = true;
                    this.error = false
                })
                .catch((error) => {
                    this.aliasError = true;
                })
        },
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
    }
}
</script>

<style scoped>
.container {
    padding: 2rem;
}

.c-header {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 20px;
}

.table-header {
    font-size: 1.5rem;
    vertical-align: text-top;
}
.table-row {
    font-size: 1.5rem;
    height: 50px !important;
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

.alias-name {
    display: flex;
    flex-direction: column;
}

.alias-modal-wrapper {
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s ease;
}


.alias-modal-container {
    display: flex;
    flex-direction: column;
    width: 50rem;
    height: 30rem;
    margin: 0 auto;
    padding: 3rem;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-field {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
}

.modal-field > input {
    font-size: 2rem;
    padding: 2rem;
}

.modal-button {
    display: flex;
    justify-content: flex-end;
}

.modal-button > button {
    padding: 1rem;
    margin-left: 1rem;
}
</style>