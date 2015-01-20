var loadtest = require('loadtest');
var expect = require('chai').expect;

var parallel = 4;
var maxRequ = 250;

suite('Stress tests', function(){
    test('Homepage handling 250 requests', function(done){
        var options = {
            url: 'http://localhost:3000',
            concurrency: parallel,
            maxRequests: maxRequ
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
            concurrency: parallel,
            maxRequests: maxRequ
        };
        loadtest.loadTest(options, function(err,result){
            expect(!err);
            expect(result.totalTimeSeconds < 1);
            done();
        });
    });
    test('View stream handling 250 requests', function(done){
        var options = {
            url: 'http://localhost:3000/stream',
            concurrency: parallel,
            maxRequests: maxRequ
        };
        loadtest.loadTest(options, function(err,result){
            expect(!err);
            expect(result.totalTimeSeconds < 1);
            done();
        });
    });
    test('View stream handling 250 requests', function(done){
        var options = {
            url: 'http://localhost:3000/map',
            concurrency: parallel,
            maxRequests: maxRequ
        };
        loadtest.loadTest(options, function(err,result){
            expect(!err);
            expect(result.totalTimeSeconds < 1);
            done();
        });
    });
});

