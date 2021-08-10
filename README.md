# Generate a text file and download it

This React project allows users to fill in the input fields like first name, last name, and file name. Clicking the button will generate a download link to the created text file. The important <Download /> component accepts a URL prop that can either be a blob object or the location of the resource. If it's a resource URL, it will fetch the resource and call Response.blob() and allow the user to download the requested resource.
