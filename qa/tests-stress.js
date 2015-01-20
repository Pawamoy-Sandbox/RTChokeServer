var loadtest = require('loadtest');

var expect = require('chai').expect;

suite('Stress tests', function(){
    test('Homepage handling 250 requests', function(done){
        var options = {
            url: 'http://localhost:3000',
            concurrency: 4,
            maxRequests: 250
        };
        loadtest.loadTest(options, function(err,result){
            expect(!err);
            expect(result.totalTimeSeconds < 1);
            done();
        });
    });
    test('View stream handling 250 requests', function(done){
        var options = {
            url: 'http://localhost:3000/viewstream',
            concurrency: 4,
            maxRequests: 250
        };
        loadtest.loadTest(options, function(err,result){
            expect(!err);
            expect(result.totalTimeSeconds < 1);
            done();
        });
    });

});

