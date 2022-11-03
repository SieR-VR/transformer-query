# transformer-query

This is the proof-of-concept library of querying ast nodes with valid string. 

Thanks for ttypescript, this made it easy to develop this library.

# How to use

![ipqfgygfszmz6mbm22to](https://user-images.githubusercontent.com/51986318/198257371-2654bbb3-bb5f-4cf4-8343-d1d4d13c9578.png)

makeTransform() returns ttypescript transform function. So, we can use like that.

Query should be tagged string literal. And it accepts imported variable or interal wildcard.

And call chain, which appears next of query, can return valid typescript code or ts.Node interface.

That's it! after this, just register it with the method described on [ttypescript](https://github.com/cevek/ttypescript).
