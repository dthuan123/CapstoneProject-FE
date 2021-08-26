<template>
    <div class="container">
        <nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/home">Trang chủ</a></li>
            <li class="breadcrumb-item"><a href="/introduce">Giới thiệu</a></li>
            <li class="breadcrumb-item active" aria-current="page">Đăng truyện</li>
            <li class="breadcrumb-item"><a href="/intro-reporting">Báo cáo truyện</a></li>
        </ol>        
        <h1>Chúng mình sẽ hướng dẫn bạn cách đăng truyện nhé</h1><br/>
        <div class="container-c">
            <h4>Trước hết bạn cần phải đăng nhập đã.</h4><br/>
            <img src="@\image-user-manual\dang-nhap.png"><br/><br/>
            <h4>Bấm vào truyện mà bạn muốn báo cáo</h4><br/>
            <img src="@\image-user-manual\nut-he-thong.png"><br/>
            <h4>Nếu bạn đã có quyền tác giả: </h4>
            <img src="@\image-user-manual\nut-he-thong1.png"><br/>
            <h4>Sau đó bấm vào nút "viết mới" để tạo tác phẩm mới<br/>hoặc nút "danh sách tác phẩm" để xem lại các tác phẩm đã viết</h4>
            <img src="@\image-user-manual\nut-viet-moi.png"><br/>
            <h4>Sau đó nhập thông tin cần thiết và bấm nút "tạo mới". Vậy là xong!</h4>
            <img src="@\image-user-manual\dien-noi-dung.png"><br/>
        </div>
        </nav>
    </div>
</template>
<style scoped>
.container {
    display: block;
}
.container-c{
    text-align: center;
    font-size: 20px;
    padding-bottom: 20px;
    padding-top: 20px;
    border: 1px solid;
    background-color: #fff;
}
.container-c img{
    width: 500px;
    height: 300px;
}
</style>