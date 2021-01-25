function UserDataDetail(props) {
    let userdata = props.userdata;
    console.log(userdata);
    return userdata.map((data) => {
        return (
            <div className="card">
                <div className="card-title">{data.title}</div>
                <div className="card-body">{data.body}</div>
            </div>
        )
    });
}

export default UserDataDetail;