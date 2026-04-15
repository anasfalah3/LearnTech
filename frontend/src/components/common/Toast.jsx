import { useEffect } from 'react'
import { useCart } from '../../hooks/useCart'

export default function Toast() {
      const { toastOpen, toastMessage, closeToast } = useCart()

      useEffect(() => {
            if (!toastOpen) return
            const timer = setTimeout(closeToast, 3000)
            return () => clearTimeout(timer)
      }, [toastOpen, closeToast])

      if (!toastOpen) return null

      return (
            <div
                  className="toast show position-fixed bottom-0 end-0 m-4"
                  style={{ zIndex: 1100, minWidth: '280px' }}
            >
                  <div className="toast-header bg-success text-white">
                        <strong className="me-auto">Success</strong>
                        <button type="button" className="btn-close btn-close-white" onClick={closeToast}></button>
                  </div>
                  <div className="toast-body bg-white border">
                        {toastMessage}
                  </div>
            </div>
      )
}
