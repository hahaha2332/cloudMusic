import React, {useState, useRef, useEffect} from  'react'
import {Container, TopDesc, SongList, SongItem} from  './style'
import { CSSTransition } from 'react-transition-group';
import Header from '../../baseUI/header'
import Scroll from  '../../baseUI/scroll/index'
import style from  '../../assets/global-style'
import {getName, getCount, isEmptyObject} from  '../../api/utils'
import {connect} from 'react-redux'
import {changeEnterLoading, getAlbumList} from './store/actionCreator'
import Loading from  '../../baseUI/loading'

const HEADER_HEIGHT = 45
const  mapStateToProps  = state  => ({
  currentAlbum:  state.getIn(['album', 'currentAlbum']),
  enterLoading: state.getIn(['album','enterLoading'])
})
// 映射dispatch 到props
const mapDispatchToProps = dispatch  => ({
  getAlbumDispatch(id){
    dispatch(changeEnterLoading(true))
    dispatch(getAlbumList(id))
  }
})
function Album (props) {
  const  [showStatus, setShowStatus] = useState(true)
  const  [isMarquee, setIsMarquee] = useState(false)
  const [title, setTitle] = useState('返回')
  const id  = props.match.params.id  // 从路由当中按到当前歌单的id

  const {currentAlbum: currentAlbumImmutable, enterLoading} = props
  const {getAlbumDispatch} = props
  const currentAlbum =  currentAlbumImmutable&&currentAlbumImmutable.toJS()
  useEffect(() => {
      getAlbumDispatch(id)
  }, [getAlbumDispatch, id])
  //  const currentAlbum = {
  //   creator: {
  //     avatarUrl: "http://p1.music.126.net/O9zV6jeawR43pfiK2JaVSw==/109951164232128905.jpg",
  //     nickname: "浪里推舟"
  //   },
  //   coverImgUrl: "http://p2.music.126.net/ecpXnH13-0QWpWQmqlR0gw==/109951164354856816.jpg",
  //   subscribedCount: 2010711,
  //   name: "听完就睡，耳机是天黑以后柔软的梦境",
  //   tracks:[
  //     {
  //       name: "我真的受伤了",
  //       ar: [{name: "张学友"}, {name: "周华健"}],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{name: "张学友"}, {name: "周华健"}],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{name: "张学友"}, {name: "周华健"}],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{name: "张学友"}, {name: "周华健"}],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{name: "张学友"}, {name: "周华健"}],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{name: "张学友"}, {name: "周华健"}],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{name: "张学友"}, {name: "周华健"}],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{name: "张学友"}, {name: "周华健"}],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{name: "张学友"}, {name: "周华健"}],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //     {
  //       name: "我真的受伤了",
  //       ar: [{name: "张学友"}, {name: "周华健"}],
  //       al: {
  //         name: "学友 热"
  //       }
  //     },
  //   ]
  // }

  const handleBack  = () => {
    setShowStatus(false)
    
  }
  const headerEl  = useRef()
  const handleScroll  = (pos) => {
 
    let minScrollY = -HEADER_HEIGHT;
  let percent = Math.abs (pos.y/minScrollY);
  let headerDom = headerEl.current;
  // 滑过顶部的高度开始变化
  if (pos.y < minScrollY) {
    headerDom.style.backgroundColor = style["theme-color"];
    headerDom.style.opacity = Math.min (1, (percent-1)/2);
    setTitle (currentAlbum.name);
    setIsMarquee (true);
  } else {
    headerDom.style.backgroundColor = "";
    headerDom.style.opacity = 1;
    setTitle ("歌单");
    setIsMarquee (false);
  }

  }
  return (
    <CSSTransition  
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExit= {props.history.goBack}
      >
       <Container>
   <Header ref={headerEl} title={title} isMarquee={isMarquee} handleClick={handleBack}></Header>
    {!isEmptyObject(currentAlbum)?(<Scroll bounceTop={false} onScroll={handleScroll}>
      <div>
        <TopDesc background={currentAlbum.coverImgUrl}>
          <div className="background">
          <div className="filter"></div>
          </div>
          <div className="img_wrapper">
            <div className="decorate">

            </div>
            <img src={currentAlbum.coverImgUrl} alt=""/>
            <div className="play_count">
               <i className="iconfont play">&#xe885;</i>
               <span className="count">{Math.floor(currentAlbum.subscribedCount/1000)/10}万</span>
            </div>
            <div className="desc_wrapper">
              <div className="title">
                {currentAlbum.name}
              </div>
              <div className="person">
                <div className="avatar">
                  <img src={currentAlbum.creator.avatarUrl} alt=""/>
                </div>
                <div className="name">{currentAlbum.creator.nickname}</div>
              </div>
            </div>
          </div>
          </TopDesc>
          <SongList>
            <div className="first_line">
              <div className="play_all">
                  <i className="iconfont">&#xe6e3;</i>
      <span > 播放全部 <span className="sum">(共 {currentAlbum.tracks.length} 首)</span></span>
              </div>
              <div className="add_list">
                 <i className="iconfont">&#xe62d;</i>
      <span > 收藏 ({getCount (currentAlbum.subscribedCount)})</span>
              </div>
            </div>
            <SongItem>
              {currentAlbum.tracks.map((item , index) => {
                return (
                  <li>
                    <span className="index">{index+1}</span>
                    <div className="info">
                      <span>{item.name}</span>
                      <span>{
                        getName(item.ar)} -{item.al.name}</span>
                    </div>
                  </li>
                )
              })}
            </SongItem>
          </SongList>
      </div>
    </Scroll>
      ): null}
      {enterLoading&&(<Loading/>)}
       </Container>
      </CSSTransition>
    
  )
}
export default connect(mapStateToProps,mapDispatchToProps)( React.memo(Album))