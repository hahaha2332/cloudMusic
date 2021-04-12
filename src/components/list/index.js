import React from 'react'
import {ListWrapper, List, ListItem } from  './style'
import LazyLoad from 'react-lazyload'
import{getCount} from '../../api/utils'
import {withRouter} from  'react-router-dom'


function RecommendList(props) {
 
  const  {recommendList, history} =props
  const enterDetail = (id) => {
    console.log(3333,id)
   history.push (`/recommend/${id}`)
  }
  return(
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
{
  recommendList.map((item,index)=> {
    return(
      <ListItem key={item.id+index} onClick={() =>{enterDetail(item.id)}}>
        <div className="img_wrapper">
          <div className="decorate"></div>
         {/* 加此参数可以表示减小请求图片资源的大小 */}
          <LazyLoad placeholder={<img width="100%" height="100%" src={require ('./music.png')} alt="music"/>}>
            <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
          </LazyLoad>
        <div className="play_count">
          <i className="icon play">&#xe885;</i>
          <span className="count">
            {
            getCount(item.playCount)
          }
          </span>
        </div>
        </div>
        <div className="desc">{item.name}</div>
      </ListItem>
    )
  })
}
      </List>
    </ListWrapper>

  )

}
export default React.memo(withRouter(RecommendList))