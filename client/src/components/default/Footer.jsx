import React from 'react'

function Footer() {
  return (
    <div className='container'>
        <div className="row">
          <div className="col-md-12 text-center">
              <p className="text-dark">
                  All Rights Reserved <strong className="text-success"> &copy; { new Date().getFullYear()} </strong>
              </p>
          </div>
        </div>
    </div>
  )
}

export default Footer
