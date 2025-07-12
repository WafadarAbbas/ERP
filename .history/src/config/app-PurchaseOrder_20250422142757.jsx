const Purchase = [
    { path: '/PurchseOrderTerms', icon: 'fa fa-cube', title: 'Purchse Order Terms',
    },
    { path: '/PurchaseOrderStatus', icon: 'fa fa-cube', title: 'Purchase Order Status',
    },
    // { path: '/PurchaseOrderDetails', icon: 'fa fa-cube', title: 'Purchase Order Details',
    // },
   
 
    { path: '/PurchaseOrderMain', icon: 'fa fa-key', title: 'Purchase Order Main',
      children: [
        { path: '/PurchaseOrderMain/PurchaseOrderMain', title: 'Purchase Order Main', icon: 'fa fa-key' },
        { path: '/PurchaseOrderMain/CreatePurchaseOrderMain', title: 'Create Purchase Order Main' , icon: 'fa fa-key'},
        { path: '/PurchaseOrderMain/EditPurchaseOrderMain', title: 'Edit Purchase Order Main', icon: 'fa fa-key'},
        { path: '/PurchaseOrderMain/PurchaseOrderDetails', title: 'PO Details', icon: 'fa fa-key'},
    
      ]
    },

    { path: '/GRNDetails', icon: 'fa fa-cube', title: 'GRN Details',
    },


    { path: '/GRNMain', icon: 'fa fa-key', title: 'GRNMain',
      children: [
        { path: '/GRNMain/GRNMain', title: 'GRN Main' },
        { path: '/GRNMain/CreateGRNMain', title: 'Create GRN Main' },
        { path: '/GRNMain/EditGRNMain', title: 'Edit GRN Main' },
        { path: '/GRNMain/EditGRNMain', title: 'Edit GRN Main' },
    
      ]
    },

    { path: '/PurchaseMain', icon: 'fa fa-key', title: 'Purchase Main',
      children: [
        { path: '/PurchaseMain/PurchaseMain', title: 'Purchase Main' },
        { path: '/PurchaseMain/CreatePurchaseMain', title: 'Create Purchase Main' },
        { path: '/PurchaseMain/EditPurchaseMain', title: 'Edit Purchase Main' },
    
      ]
    },
    { path: '/PurchaseDetail', icon: 'fa fa-cube', title: 'Purchase Detail',
    },

    { path: '/PurchaseReturnMain', icon: 'fa fa-key', title: 'Purchase Return Main',
      children: [
        { path: '/PurchaseReturnMain/PurchaseReturnMain', title: 'Purchase Return Main' },
        { path: '/PurchaseReturnMain/CreatePurchaseReturnMain', title: 'Create Purchase Return Main' },
        { path: '/PurchaseReturnMain/EditPurchaseReturnMain', title: 'Edit Purchase Return Main' },
    
      ]
    },
    
  
  ]
  
  export default Purchase;