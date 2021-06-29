import { IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonRow } from '@ionic/react';
import { arrowForwardCircleOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getComments } from '../api/api';
import { PaginatedResult,Comment } from '../interfaces';
import { Pagination } from './Pagination';

interface CommentsProps {
    movieId:number;

}

export const Comments: React.FC<CommentsProps> = ({movieId}) => {
      const [pagination, setPagination] = useState<PaginatedResult<Comment>>()
      console.log("🚀 ~ file: Comments.tsx ~ line 12 ~ pagination", pagination)
      const [pageNr,setPageNr] = useState<number>(1)
       useEffect(()=>{
           const fetchData = async () =>{
               setPagination(await getComments(movieId,pageNr,10) as PaginatedResult<Comment>)
           }
           fetchData()
       },[pageNr])

        return (
            <>
            <h1>Comments</h1>
            <IonGrid>
                {pagination?.entities ? pagination.entities.map(comm =>(
                   		<IonRow key={comm.id}>
                           <IonCol>
                               <IonItem>
                                   <IonLabel>{comm.text}</IonLabel>
                                   
                               </IonItem>
                           </IonCol>
                       </IonRow> 
                )) : "loading..."}
                <Pagination setPageNr={setPageNr} pagination={pagination!}/>
            </IonGrid>
            </>
        );
}