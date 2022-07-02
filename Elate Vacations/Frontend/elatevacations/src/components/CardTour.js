import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBCardGroup, MDBIcon, MDBBtn, MDBTooltip } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likeTour } from '../redux/features/tourslice';

const CardTour = ({ imageFile, description, title, name, tags, _id, likes }) => {
    // console.log( imageFile)
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> ({...state.auth}));
    const userId = user?.result?._id;
    const excerpt = (str) => {
        if (str.length > 45) {
            str = str.substring(0, 45) + "..."
        }
        return str;
    }

    const Likes = ()=>{
        if(likes.length > 0){
            return likes.find((like)=> like === userId) ? (
                <>
                <MDBIcon fas icon="thumbs-up"/>
                &nbsp;
                {likes.length > 2 ?(
                    <MDBTooltip tag="a" title={`You and ${likes.length - 1}others liked`}>
                        {likes.length} Likes
                    </MDBTooltip>
                ) : (
                    
                    `${likes.length} Like${likes.length> 1 ? 's' : ""}`
                )}
                </>
            ) : (
                <>
                <MDBIcon far icon="thumbs-up"/>
                &nbsp;{likes.length}{likes.length === 1 ? "Like" : "Likes"}
                </>
            )
        }
        return(
            <>
            <MDBIcon far icon="thumbs-up"/>
            &nbsp;Like
            </>
        )
    }
   const handleLike = ()=>{
    dispatch(likeTour({_id}))

   }
            
    return (
        <MDBCardGroup>
            <MDBCard className="h-100 mt-2 d-sm-flex">
                <MDBCardImage
                    src={imageFile}
                    alt={title}
                    position="top"
                    style={{ maxWidth: "100%", height: "180px" }}
                />
                <div className="top-left">{name}</div>
                <span className="text-start tag-card ms-2">{tags.map((tag, index) => (
                    <Link key={index} to={`/tours/tag/${tag}`}>#{tag}</Link>)
                )}
                <MDBBtn style={{float: "right"}} tag="a" color="none" onClick={!user?.result? null : handleLike}>
                    {!user?.result ? (
                        <MDBTooltip title="Please login to like tours" tag="a">
                            <Likes/>
                        </MDBTooltip>
                    ) : (
                        <Likes/> 
                    )
                }

                    
                </MDBBtn>
                </span>

                <MDBCardBody>
                    <MDBCardTitle className="text-start">{title}</MDBCardTitle>
                    <MDBCardText className="text-start">{excerpt(description)}</MDBCardText>
                    <Link to={`/tour/${_id}`}>
                        Read more...
                    </Link>
                </MDBCardBody>

            </MDBCard>
        </MDBCardGroup>
    )
}

export default CardTour
