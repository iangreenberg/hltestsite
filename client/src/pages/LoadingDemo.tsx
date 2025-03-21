import { useState } from 'react';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { HempLoader, HempBouncingLoader, HempGrowingLoader, HempProgress } from '@/components/ui/hemp-loader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoadingDemo() {
  const [progress, setProgress] = useState(30);
  const [activeVariant, setActiveVariant] = useState<'spinner' | 'bouncing' | 'growing' | 'progress'>('spinner');
  const [customMessage, setCustomMessage] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  
  // Simulate progressing loader
  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 700);
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-[#2F5D50] mb-2">Hemp-Themed Loading Animations</h1>
      <p className="text-gray-600 mb-8">Playful loading animations with hemp-themed graphics.</p>
      
      {showOverlay && (
        <LoadingScreen
          variant={activeVariant}
          message={customMessage || undefined}
          showProgress={showProgress}
          progress={progress}
          overlay={true}
        />
      )}
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Loading Animation Demo</CardTitle>
              <CardDescription>
                See how different hemp-themed loading animations look and behave.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border rounded-md bg-gray-50">
                {activeVariant === 'spinner' && (
                  <HempLoader size="lg" text={customMessage || "Loading..."} />
                )}
                {activeVariant === 'bouncing' && (
                  <HempBouncingLoader />
                )}
                {activeVariant === 'growing' && (
                  <HempGrowingLoader />
                )}
                {activeVariant === 'progress' && (
                  <div className="w-64">
                    <HempProgress 
                      value={progress} 
                      size="lg" 
                      showValue={true} 
                      text={customMessage || "Loading..."} 
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start space-y-4">
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="message">Custom Message</Label>
                <Input 
                  id="message" 
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Enter custom loading message"
                />
              </div>
              {activeVariant === 'progress' && (
                <div className="flex flex-col space-y-1.5 w-full">
                  <Label htmlFor="progress">Progress Value</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="progress" 
                      type="number"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                    />
                    <Button onClick={simulateProgress}>Simulate</Button>
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>
                Customize the loading animation style and options.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-2 block">Animation Style</Label>
                <Tabs 
                  defaultValue="spinner" 
                  value={activeVariant}
                  onValueChange={(value) => setActiveVariant(value as any)}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="spinner">Spinner</TabsTrigger>
                    <TabsTrigger value="bouncing">Bouncing</TabsTrigger>
                    <TabsTrigger value="growing">Growing</TabsTrigger>
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showProgress"
                  checked={showProgress}
                  onChange={() => setShowProgress(!showProgress)}
                  className="h-4 w-4 rounded border-gray-300 text-[#2F5D50] focus:ring-[#2F5D50]"
                />
                <Label htmlFor="showProgress">Show Progress Bar</Label>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={() => setShowOverlay(true)} 
                  className="bg-[#2F5D50] hover:bg-[#264A40] w-full"
                >
                  Show as Overlay
                </Button>
                {showOverlay && (
                  <p className="text-sm text-gray-500 mt-2">
                    Click anywhere to dismiss the overlay.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Available Sizes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end space-x-6">
                  <div className="flex flex-col items-center">
                    <HempLoader size="sm" />
                    <span className="text-xs mt-2">Small</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <HempLoader size="md" />
                    <span className="text-xs mt-2">Medium</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <HempLoader size="lg" />
                    <span className="text-xs mt-2">Large</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <HempLoader size="xl" />
                    <span className="text-xs mt-2">XL</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}