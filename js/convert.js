//function convertDec() {
//    var dec = $('#decimal').val();
//    $('#binary').val(decToBin(dec));
//    $('#octal').val(decToOct(dec));
//    $('#hexagonal').val(decToHex(dec));
//}

//function convertBin() {
//    var bin = $('#binary').val();
//    $('#octal').val(binToOct(bin));
//    $('#decimal').val(binToDec(bin));
//    $('#hexagonal').val(binToHex(bin));
//}

//function convertOct() {
//    var oct = $('#octal').val();
//    $('#binary').val(octToBin(oct));
//    $('#decimal').val(octToDec(oct));
//    $('#hexagonal').val(octToHex(oct))
//}

//function convertHex() {
//    var hex = $('#hexagonal').val();
//    $('#binary').val(hexToBin(hex));
//    $('#octal').val(hexToOct(hex));
//    $('#decimal').val(hexToDec(hex));
//}


$('h1').each(function () {
	var $wrapper = $(this);
	$wrapper.attr('data-heading', $wrapper.text());
});
 
var octValArr = ['0', '1', '2', '3', '4', '5', '6', '7'],
	octToBinArr = ['000', '001', '010', '011', '100', '101', '110', '111'],
	hexToBinArr = ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111'],
	hexValArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
	validDigit = ['0123456789', '01', '01234567', '0123456789ABCDEFabcdef'];

const a = 48,
	binRadix = 2,
	octRadix = 8,
	decRadix = 10,
	hexRadix = 16;

String.EMPTY = '';

window.onload = function () {
	$('input').keypress(function (e) {
		var $input = $(this);
		if (!$input.val().length && a == e.which) {
			return false;
		} else {
			return validDigit[$input.attr('tabindex') - 1].indexOf(String.fromCharCode(e.which)) != -1;
		}
	});
}

var $radix2 = $('#binary'),
	$radix8 = $('#octal'),
	$radix10 = $('#decimal'),
	$radix16 = $('#hexadecimal');

	function convertNumber(inputVal, radix) {
		switch (radix) {
			case binRadix:
				$radix8.val(binToOct(inputVal));
				$radix10.val(binAndOctToDec(inputVal, binRadix));
				$radix16.val(binToHex(inputVal));
				break;

			case octRadix:
				$radix2.val(octToBin(inputVal));
				$radix10.val(binAndOctToDec(inputVal, octRadix));
				$radix16.val(octToHex(inputVal));
				break;

			case decRadix:
				$radix2.val(decToBinAndOct(inputVal, binRadix));
				$radix8.val(decToBinAndOct(inputVal, octRadix));
				$radix16.val(decToHex(inputVal));
				break;

			case hexRadix:
				$radix2.val(hexToBin(inputVal));
				$radix8.val(classVal.hexToOct(inputVal));
				$radix10.val(classVal.hexToDec(inputVal));
				break;
		}
	}

	$radix2.on('input', function () {
		convertNumber($radix2.val(), binRadix);
	});

	$radix8.on('input', function () {
		convertNumber($radix8.val(), octRadix);
	});

	$radix10.on('input', function () {
		convertNumber($radix10.val(), decRadix);
	});

	$radix16.on('input', function () {
		convertNumber($radix16.val(), hexRadix);
	});

	//Dec
	function decToBinAndOct(decVal, radix) {
		var val = String.EMPTY;

		while (decVal > 0) {
			val = decVal % radix + val;
			decVal = Math.floor(decVal / radix);
		}

		return val;
	}

	function decToHex(decVal) {
		var hexVal = String.EMPTY,
			remainder,
			radix = 16;

		while (decVal > 0) {
			remainder = decVal % radix;
			hexVal = hexValArr[remainder] + hexVal;
			decVal = Math.floor(decVal / radix);
		}

		return hexVal;
	}

	//Bin
	function binToOct(binVal) {
		var octVal = String.EMPTY,
			len = binVal.length;

		(len % 3) && (binVal = '0'.repeat(3 - (len % 3)) + binVal);

		for (var i = 0; i < len; i += 3) {
			octVal += octToBinArr.indexOf(binVal.substr(i, 3));
		}

		return octVal;
	}

	function binAndOctToDec(val, radix) {
		var decVal = null,
			len = val.length;

		for (var i = len - 1, j = 0; i >= 0; i--, j++) {
			decVal += val[i] * Math.pow(radix, j);
		}

		return decVal;
	}

	function binToHex(binVal) {
		var hexVal = String.EMPTY,
			len = binVal.length;

		(len % 4) && (binVal = '0'.repeat(4 - (len % 4)) + binVal);

		for (var i = 0; i < len; i += 4) {
			hexVal += hexValArr[hexToBinArr.indexOf(binVal.substr(i, 4))];
		}

		return hexVal;
	}

	//Oct
	function octToBin(octVal) {
		var binVal = String.EMPTY,
			len = octVal.length,
			str = String.EMPTY;

		for (var j = 0; j < len; j++) {
			str = octToBinArr[hexValArr.indexOf(octVal.substr(j, 1))];
			if (j == 0) {
				while ('0' == str[0]) {
					str = str.slice(1, str.length);
				}
			}
			binVal += str;
		}

		return binVal;
	}

	function octToHex(octVal) {
		var dec = binAndOctToDec(octVal, octRadix);

		return decToHex(dec);
	}

	//Hex 
	function hexToBin(hexVal) {
		var binVal = String.EMPTY,
			len = hexVal.length,
			str = String.EMPTY;

		for (var j = 0; j < len; j++) {
			str = hexToBinArr[hexValArr.indexOf(hexVal.substr(j, 1))];
			if (j == 0) {
				while ('0' == str[0]) {
					str = str.slice(1, str.length);
				}
			}
			binVal += str;
		}

		return binVal;
	}

class Hexadecimal {
		hexToOct(hexVal) {
			var bin = hexToBin(hexVal);

			return binToOct(bin);
		}

		hexToDec(hexVal) {
			var bin = hexToBin(hexVal);

			return binAndOctToDec(bin, binRadix);
		}
	}

var classVal = new Hexadecimal();