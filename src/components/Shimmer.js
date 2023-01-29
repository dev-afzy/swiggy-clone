import '../style.css';

const Shimmer = () => {
  return (
    <div className='restaurant-main'>
      {Array(9)
        .fill('')
        .map((data, index) => (
          <div className='shimmer-outer' key={index}>
            <div className='shimmer-inner' />
            {/* <div className='item'>
              <div className='item-name'>
                <h4>{data.name}</h4>
                <p>{data.cuisines.join(', ')}</p>
              </div>
              <div className='item-price'>
                <p>{data.totalRatingsString}</p>
                <div className='rating'>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div> */}
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
