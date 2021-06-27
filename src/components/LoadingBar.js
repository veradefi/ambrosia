import styled from "styled-components"


const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 2;
    cursor: pointer;

    display : flex;
    justify-content : center;
    align-items :center;
    flex-direction: column;
    width: 100%;
    color : white;
`


export const LoadingBar = ({ message }) => (
    <Container>
        <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <strong>{message}</strong>
    </Container>
)