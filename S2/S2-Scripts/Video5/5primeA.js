//process este doar pentru varianta server
// evident ca vom rula cu node [ourfile.js] 5 (sa zicem ca 5 este parametru) -> tb sa avem cel putin 3 parametri

if (process.argv.length < 3) {
    console.log('not enough params')
} else {
    console.log('fine')
}




