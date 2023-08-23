import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';


function SearchTaskDropDown({ tasks }) {
    return (


        <ListGroup>
            {
                tasks?.map((item) => {
                    return (
                        <Link to={`/task/${item.id}`}>
                            <ListGroup.Item key={item.id}>

                                {item.title}
                            </ListGroup.Item>

                        </Link>

                    )
                })
            }
        </ListGroup>
    );
}

export default SearchTaskDropDown;