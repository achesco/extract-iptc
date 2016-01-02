# extract-iptc

Simple wrapper and parser around imagemagick's convert CLI utility call to extract IPTC/XMP metadata.

## Installation

`npm install extract-iptc`

## Usage

``` js
var ExtractIptc = require('extract-iptc');

// if convert utility isn'n in PATH variable
ExtractIptc.setImageMagickConvertPath('/path/to/bin/convert');

ExtractIptc.extract('/path/to/image.jpg', function (error, meta) { 
    if (error) {
        console.error(error);
    }
    console.log('Title is: ' + meta.title);
    if (meta.keywords) {
        if (typeof meta.keywords === 'string') {
            console.log('Single keyword is: ' + meta.keywords);
        } else {
            console.log('Keywords are: ' + meta.keywords.join(', '));
        }
    }
    console.log('Copyrighted by: ' + meta.copyright);
});
```

## Resulting meta object fields reference

NB. Returns array for any tag values with multiple occurrences.

| extract-iptc | IPTC | XMP |
|--------------|------|-----|
| title | Object Name | Title |
| urgency | Urgency | Urgency |
| category | Category | Category |
| supplementalCategory | Supplemental Category | Supplemental Categories |
| keywords | Keywords | Keywords |
| instructions | Special Instruction | Instructions |
| dateCreated | Date Created | Date Created |
| author | By-line | Author |
| authorsPosition | By-line Title | AuthorsPosition |
| city | City | City |
| state | Province/State | State/Province |
| country | Country/Primary Location Name | Country |
| transmissionReference | Original Transmission Reference | Transmission Reference |
| headline | Headline | Headline |
| credit | Credit | Credit |
| source | Source | Source |
| copyright | Copyright Notice | Copyright Notice |
| description | Caption/Abstract | Description |
| writer | Writer/Editor | Description Writer |
