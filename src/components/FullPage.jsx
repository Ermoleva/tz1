import styles from "../styles/FullPage.module.scss"
import SliderCard from "./SliderCards";
import Articles from "./Articles";
import {useEffect, useMemo, useState} from "react";

import prev from "../images/arrow_prev.svg"
import next from "../images/arrow_next.svg"
import axios from "axios";

export default function FullPage() {
    const [articlesByUserId, setArticlesByUserId] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [users, setUsers] = useState([]);
    const [slider, setSlider] = useState(false);


    useEffect(()=>{
        axios.get("https://jsonplaceholder.typicode.com/users").then((resp) =>{
            const allUsers = resp.data
            setUsers(allUsers)
        })
    },[])

    const search = (users, query ) => {
        return users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
    }


    let contentSliderClass = articlesByUserId > 0 ? styles.sliderArticles : styles.slider;

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <p className={styles.header__nav_logo}>Lorem ipsum</p>
                <input value={searchKeyword} autoFocus className={styles.header__nav_input} placeholder="Search"
                       onChange={(e) => setSearchKeyword(e.target.value)}/>

            </div>
            <div className={styles.content}>
                <div className={contentSliderClass}>
                    <SliderCard users={search(users, searchKeyword)} setSlider={setSlider} userId={articlesByUserId}
                                setUserId={setArticlesByUserId}/>
                </div>
                <Articles userId={articlesByUserId}/>
            </div>
            {slider && <div className={styles.footer}>
                <div href={'#'}
                     className={styles.footer__slide_prev}
                     onClick={slider.slickPrev}>
                    <img src={prev} alt=""/>
                    Previous
                </div>
                <div href={'#'}
                     className={styles.footer__slide_next}
                     onClick={slider.slickNext}>
                    Next
                    <img src={next} alt=""/>
                </div>
            </div>}
        </div>
    )
}