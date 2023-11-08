import styled from 'styled-components'

export const RecommendWrapper = styled.div`
  > .content {
    display: flex;
    border: 1px solid #d3d3d3;
    /* background-image: url(${require('@/assets/img/wrap-bg.png')});
     */
    background-color: #fff;
    > .left {
      padding: 20px;
      width: 729px;
    }
    > .right {
      width: 250px;
      margin-left: 1px;
      border-left: 1px solid #d3d3d3;
    }
  }
`
