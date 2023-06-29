import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Blog() {

    const key = 'pk.eyJ1IjoidmluaHRhbjAxMDEyMDAxIiwiYSI6ImNsYXIxbjR4azAxenYzcW1saWZ3N3M3bGgifQ.XdLXDFNYnDlgy95gWsbGZQ'
    return (
        <React.Fragment>
            <div className="app__container">
                <div className="grid wide">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pd5">
                            <div className="app__container--category">
                                <Link to="/" className="app__container--link">Trang chủ</Link>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <p className="app__container--text">Tin tức</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 pd5">
                            <h2 className="text-center">Chưa có bài viết nào trong mục này</h2>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 pd5">
                            <div className="blog-sidebar mb15">
                                <div className="wrapper-article-list">
                                    <div className="product__comment">
                                        <h2 className="title-group">Bài viết mới nhất</h2>
                                    </div>
                                </div>
                                <ul className="list-article-new">
                                </ul>
                            </div>
                            <div className="col-lg-4 col-sm-12 col-xs-12 box__banner mb15">
                                <div className=" ">
                                    <div className="box-banner-index text-center mb15">
                                        <Link to="/category/t-shirts">
                                            <img src="//theme.hstatic.net/200000305259/1000963148/14/banner_product_2_grande.jpg?v=44" className="dt-width-100 lazyloaded" width="360" height="200" data-src="//theme.hstatic.net/200000305259/1000963148/14/banner_product_2_grande.jpg?v=44" alt="banner 2" title="banner 2" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12 col-xs-12 box__banner mb15">
                                <div className=" ">
                                    <div className="box-banner-index text-center mb15">
                                        <Link to="/category/t-shirts">
                                            <img src="//theme.hstatic.net/200000305259/1000963148/14/banner_product_3_grande.jpg?v=44" className="dt-width-100 lazyloaded" width="360" height="200" data-src="//theme.hstatic.net/200000305259/1000963148/14/banner_product_3_grande.jpg?v=44" alt="banner 3" title="banner 3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12 col-xs-12 box__banner mb15">
                                <div className=" ">
                                    <div className="box-banner-index text-center mb15">
                                        <Link to="/category/t-shirts">
                                            <img src="//theme.hstatic.net/200000305259/1000963148/14/banner_product_1_grande.jpg?v=44" className="dt-width-100 lazyloaded" width="360" height="200" data-src="//theme.hstatic.net/200000305259/1000963148/14/banner_product_1_grande.jpg?v=44" alt="banner 1" title="banner 1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Blog;