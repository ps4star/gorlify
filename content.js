const rTable = [
	"girl", "gorl",
	"situation", "situation type deal",
	"hater", "haydur",
	"earring", "eareen",
	"immobile", "wearing the wrong shoes",
	"hungry", "hongry",
	"fat", "just swollen you guise",
	"literally", "lidurally",
	"i can't", "I have a heel spur",
	"becky", "BECKEEEEEEYYYUUHHHH",
	"optavia", "octivia",
	"kimono", "kameeno",
	"mukbang", "mook-bong",
	"fake", "hootenberry",
	"lie", "lah",
	"much sodium", "many sodiums",
	"cheese", "chease",
	"pieces of bacon", "bacons",
	"destiny", "density",
	"weight loss", "weight gain",
	"wal[\-]*mart", "wommart",
	"wreath", "reef",
	"night(\-| )*time", "darktime",
	"moment", "molment",
	"windchime[\s]*", "jangly loud thing",
	"rape", "rain and petals eavesdrop, I used the wrong word",
	"napkin holder is empty", "napkin holder is all like no-napkiney",
	"standing", "standed",
	"realize", "rillize",
	"meal", "mill",
	"selling", "saileen",
	"big?", "BIG?? ARE YOU CALLING ME BIG??",
	"dizzy", "jambled",
	"confused", "jambled",
	"mixed up", "jambled up",
]

// const compiledRTable = []
// for (let i = 0; i < rTable.length; i += 2) {
// 	compiledRTable.push((new RegExp(`\b${rTable[i]}\b`, "gi")))
// }

function doTextReplace(txt) {
	for (let i = 0; i < rTable.length; i += 2) {
		const regex = new RegExp(`${rTable[i]}`, "gi")
		const testMatch = txt.match(regex)

		let isUpper = 0
		if (testMatch) {
			if (testMatch[0].charAt(0) >= 'A' && testMatch[0].charAt(0) <= 'Z') {
				isUpper = 1

				if (testMatch[0].length >= 2 && testMatch[0].charAt(1) >= 'a' && testMatch[0].charAt(1) <= 'z') {
					isUpper = 2
				}
			}
		}

		let toRep = rTable[i + 1]
		if (isUpper == 1) {
			toRep = toRep.toUpperCase()
		} else if (isUpper == 2) {
			toRep = toRep.charAt(0).toUpperCase() + toRep.slice(1)
		}

		const resultRegex = new RegExp(toRep)
		if (txt.match(resultRegex)) continue

		txt = txt.replace(regex, toRep)
	}
	return txt
}

// const docEls = document.getElementsByTagName('*')

// function doSingleRep(node) {
// 	if (node.nodeType === Node.TEXT_NODE) {
// 		const text = node.nodeValue
// 		const replacedText = doTextReplace(text)

// 		if (replacedText !== text) {
// 			node.nodeValue = replacedText
// 			//node.parentNode.replaceChild(document.createTextNode(replacedText), node)
// 		}
// 	}
// }

// function doRep(els) {
// 	if (!els) return
// 	const cstyle = []
// 	Array.from(els).forEach(ch => cstyle.push(ch.style.visibility))

// 	for (let i = 0; i < els.length; i++) {
// 		const el = els[i]

// 		for (let j = 0; j < el.childNodes.length; j++) {
// 			const node = el.childNodes[j]

// 			doSingleRep(node)
// 		}
// 	}

// 	Array.from(els).forEach((ch, i) => ch.style.visibility = cstyle[i])
// }

// // Unused
// function treeFlatten(el, arr) {
// 	if (!el.firstChild) return arr;
// 	if (arr == null) arr = [];
// 	arr.push(el)
// 	Array.from(el.children).forEach(ch => {
// 		arr.push(ch)
// 		treeFlatten(ch, arr)
// 	})
// 	return arr
// }

// doRep(docEls)

window.onload = () => {
	walk(document.body)
}

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			const txt = node.nodeValue.trim()
			if (!txt || txt.length < 2) break;
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	textNode.nodeValue = doTextReplace(textNode.nodeValue)
}

const observer = new MutationObserver((ml, observer) => {
	observer.takeRecords()

	for (mut of ml) {
		walk(mut.target)
		walk(document.getElementsByTagName('TITLE')[0])
	}
})

observer.observe(document.body, {
	subtree: true,
	attributes: true,
	childList: true,
})