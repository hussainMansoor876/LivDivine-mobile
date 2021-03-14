const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#fe7013',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#fe7013'
}

const labels = ["General", "Profile", "Instructions", "Intro", "Categories"];

const videoOptions = {
    title: 'Select Video',
    mediaType: 'video',
    takePhotoButtonTitle: 'Record Video',
    durationLimit: 180,
    allowsEditing: true,
    thumbnail: true,
    videoQuality: 'low',
    storageOptions: {
        skipBackup: true,
        path: 'videos'
    }
};

const categoriesArray = [
    {
        name: 'Tarot readings'
    },
    {
        name: 'Psychic readings'
    }, {
        name: 'Relationship coaching'
    },
    {
        name: 'Palm readings'
    },
    {
        name: 'Astrology & Horoscopes'
    },
    {
        name: 'Oracle guidance'
    },
    {
        name: 'Angel insights'
    },
    {
        name: 'Dream Analysis'
    }
]

const orderTypes = [
    {
        orderTypeName: 'Video reading',
        subTitle: 'Recorded & delivered within 24 hours',
        price: '$10',
        orderPrice: 'Order $10',
        isActive: false
    },
    {
        orderTypeName: 'Rush video reading',
        subTitle: 'Recorded & delivered within 60 minutes',
        price: '$15',
        orderPrice: 'Order $15',
        isActive: false
    },
    {
        orderTypeName: 'Live chat',
        subTitle: 'Live chat reading - right now',
        price: '$0.99/min',
        orderPrice: '$0.99/min',
        isActive: false
    },
    {
        orderTypeName: 'Live video call',
        subTitle: 'Live video reading - right now',
        price: '$3.99/min',
        orderPrice: '$3.99/min',
        isActive: false
    },
    {
        orderTypeName: 'Live audio call',
        subTitle: 'Live audio reading - right now',
        price: '$1.99/min',
        orderPrice: '$1.99/min',
        isActive: false
    }
]

const orderTypesCopy = [
    {
        orderTypeName: 'Video reading',
        subTitle: 'Recorded & delivered within 24 hours',
        price: 10,
        isActive: false
    },
    {
        orderTypeName: 'Rush video reading',
        subTitle: 'Recorded & delivered within 60 minutes',
        price: 15,
        isActive: false
    },
    {
        orderTypeName: 'Live chat',
        subTitle: 'Live chat reading - right now',
        price: 0.99,
        isActive: false
    },
    {
        orderTypeName: 'Live video call',
        subTitle: 'Live video reading - right now',
        price: 3.99,
        isActive: false
    },
    {
        orderTypeName: 'Live audio call',
        subTitle: 'Live audio reading - right now',
        price: 1.99,
        isActive: false
    }
]

const roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2")
}

const appColor = '#FF1493'

export {
    customStyles,
    labels,
    videoOptions,
    categoriesArray,
    orderTypes,
    appColor,
    orderTypesCopy,
    roundToTwo
}