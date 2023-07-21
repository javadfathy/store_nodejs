
jQuery('#addSpicific').click(function(){
        const spicific = document.createElement('input')
    spicific.setAttribute('type','text')
    spicific.setAttribute('class','bg-gray-50 mx-2 inline-block w-30 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
    spicific.setAttribute('name','spicific')
    document.getElementById('spicifics').appendChild(spicific)
  });

jQuery('#addTitle').click(function(){
    console.log('fdfs')
    const title = document.createElement('input')
    title.setAttribute('type','text')
    title.setAttribute('class','bg-gray-50 mx-2 inline-block w-30 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
    title.setAttribute('name','title')
    document.getElementById('titles').appendChild(title)
})

jQuery('#addLink').click(function(){
    const link = document.createElement('input')
    link.setAttribute('type','text')
    link.setAttribute('class','bg-gray-50 mx-2 inline-block w-30 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
    link.setAttribute('name','link')
    document.getElementById('links').appendChild(link)
})

jQuery('#addIcon').click(function(){
    const icon = document.createElement('input')
    icon.setAttribute('type','text')
    icon.setAttribute('class','bg-gray-50 mx-2 inline-block w-30 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500')
    icon.setAttribute('name','icon')
    document.getElementById('icons').appendChild(icon)
})