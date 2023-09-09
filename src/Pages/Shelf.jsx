import BookImage from 'Assets/Images/book.jpg';
import Layout from "Layouts/Layout";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllBookShelves } from 'Redux/Slices/ShelfSlice';
export default function Shelf() {

    const shelfState = useSelector((state) => state.shelf);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeShelf, setActiveShelf] = useState(null);
    const [books, setBooks] = useState([]);

    async function loadShelfs() {
        if(shelfState.shelfList.length == 0) {
            const response = await dispatch(getAllBookShelves());
            if(response?.payload?.data?.data?.length > 0) {
                setBooks(response?.payload?.data?.data[0].books);
                setActiveShelf(response?.payload?.data?.data[0]._id);
            } 
            console.log(response);
        } else if(shelfState.shelfList.length > 0) {
            setBooks(shelfState.shelfList[0].books);
            setActiveShelf(shelfState.shelfList[0]._id);
        }
    }

    function changeActiveShelf(id) {
        setActiveShelf(id);
        shelfState.shelfList.forEach(shelf => {
            if(shelf._id == id) {
                console.log(shelf.books);
                setBooks(shelf.books);
            }
        });
    }

    useEffect(() => {
        loadShelfs();
    }, []);

    return (
        <Layout>
            <div className='flex justify-start items-start gap-32'>
                <div className='flex flex-col justify-start items-start'>
                    {shelfState.shelfList.length > 0 && shelfState.shelfList.map((shelf) => {
                        return (
                            <div onClick={() => changeActiveShelf(shelf._id)} key={shelf._id} className='mt-3 mb-3'>
                                <button className={`btn-${activeShelf == shelf._id ? 'primary' : 'warning'} px-2 py-1 text-2xl`}>{shelf.name}</button>
                             </div>
                        );
                    })}
                </div>
                <div className="overflow-x-auto">
                {books.length > 0 && (
                    <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        
                        <th>Title</th>
                        <th>Rating</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {books.length > 0 && books.map(book => {
                        return (
                            <tr className='hover:bg-slate-700' key={book._id} onClick={() => {
                                navigate("/book/description", {state: {...book}});
                            }}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={BookImage} alt="Book Image" />
                                        </div>
                                        </div>
                                        <div>
                                        <div className="font-bold text-xl" >{book.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>5</td>
                                <th>
                                <button className="btn btn-ghost btn-xs text-l hover:bg-primary">details</button>
                                </th>
                        </tr>
                        );
                    })}
                    
                    </tbody>
                    {/* foot */}
                    <tfoot>
                    <tr>
                        <th>Title</th>
                        <th>Rating</th>
                        <th></th>
                    </tr>
                    </tfoot>
                    
                </table>
                )}
                
            </div>
            </div>
           `
        </Layout>
    );
}