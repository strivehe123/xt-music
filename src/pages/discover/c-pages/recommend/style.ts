import styled from 'styled-components'

export const RecommendWrapper = styled.div`
  > .content {
    display: flex;
    box-sizing: border-box;
    border: 1px solid #d3d3d3;
    /* background-image: url(${require('@/assets/img/wrap-bg.png')});
     */
    background-color: #fff;
    > .left {
      box-sizing: border-box;
      padding: 20px;
      width: 729px;
    }
    > .right {
      box-sizing: border-box;
      width: 250px;
      margin-left: 1px;
      border-left: 1px solid #d3d3d3;
    }
  }
`
